import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import { S3 } from '@aws-sdk/client-s3';
import axios from 'axios';

dotenv.config();

const app = express();
const upload = multer({ dest: 'uploads/' });

// AWS S3 configuration
const s3 = new S3({
  region: 'us-east-1', // Replace with your desired AWS region
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

// Endpoint for saving the photo
app.post('/api/photos', upload.single('image'), async (req, res) => {
  try {
    // Access the uploaded photo using req.file
    const photo = req.file;
    console.log('Uploaded photo:', photo);

    // Access other form fields like title, year, desc using req.body
    const { title, year, desc } = req.body;

    // Upload the photo to S3
    const uploadParams = {
      Bucket: 'gallery-photo-bucket', // Replace with your S3 bucket name
      Key: photo.originalname,
      Body: photo.buffer,
    };
    console.log('Upload params:', uploadParams);

    const uploadResult = await s3.upload(uploadParams);
    console.log('Upload result:', uploadResult);

    // Get the uploaded photo's URL from the S3 response
    const photoUrl = uploadResult.Location;

    // Save the photo details to your database or any other storage
    // ...

    // Make a POST request to another server endpoint with the photo URL
    const serverUrl = 'https://your-server.com/api/photos'; // Replace with the URL of the other server
    const fd = new FormData();
    fd.append('image', photo.buffer);
    axios.post(serverUrl, fd)
      .then(response => {
        const imageUrl = response.data.url;
        // Update the photo URL in the response
        res.status(200).json({
          message: 'Photo saved successfully',
          photoUrl: imageUrl,
          title,
          year,
          desc,
        });
      })
      .catch(error => {
        console.error('Error uploading image to the other server:', error);
        res.status(500).json({ error: 'An error occurred while uploading the image to the other server' });
      });
  } catch (error) {
    console.error('Error saving photo:', error);
    res.status(500).json({ error: 'An error occurred while saving the photo' });
  }
});

// Start the server
const port = 5173; // Use any available port you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
