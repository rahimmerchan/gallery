import express from "express";
import cors from "cors";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
  })
);
const port = 5001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const photosPath = join(__dirname, "data", "photos.json");

app.use(express.json());

// Add this route handler for the root path ("/")
app.get("/", (req, res) => {
  res.send("Server is running"); // You can modify this response as needed
});

// GET /api/photos - Retrieve all photos
app.get("/api/photos", async (req, res) => {
  try {
    const data = await fs.readFile(photosPath, "utf8");
    const photos = JSON.parse(data);
    res.json(photos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/photos - Add a new photo
app.post("/api/photos", async (req, res) => {
  try {
    const data = await fs.readFile(photosPath, "utf8");
    const photos = JSON.parse(data);
    const newPhoto = req.body;
    newPhoto.id = generateUniqueId(); // Add a unique ID to the new photo
    photos.push(newPhoto);
    await fs.writeFile(photosPath, JSON.stringify(photos), "utf8");
    res.status(201).json(newPhoto);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /api/photos - Edit an existing photo
app.put("/api/photos/:id", async (req, res) => {
  const photoId = req.params.id;

  try {
    const data = await fs.readFile(photosPath, "utf8");
    let photos = JSON.parse(data);
    // getting new photo
    const newPhoto = req.body;
    newPhoto.id = generateUniqueId(); // Add a unique ID to the new photo
    // finding index of photo to edit
    const index = photos.findIndex((photo) => photo.id == photoId);
    if (index === -1) {
      return res.status(404).json({ error: "Photo not found" });
    }
    // edit by setting the old photo to new photo
    photos[index] = newPhoto;

    await fs.writeFile(photosPath, JSON.stringify(photos), "utf8");
    res.status(200).json(newPhoto);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/photos/:id - Delete a photo by ID
app.delete("/api/photos/:id", async (req, res) => {
  const photoId = req.params.id;

  try {
    const data = await fs.readFile(photosPath, "utf8");
    let photos = JSON.parse(data);
    const index = photos.findIndex((photo) => photo.id === photoId);
    if (index === -1) {
      return res.status(404).json({ error: "Photo not found" });
    }

    photos.splice(index, 1);

    await fs.writeFile(photosPath, JSON.stringify(photos), "utf8");
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Utility function to generate a unique ID for a new photo
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

// Serve static files from the "public" directory
app.use(express.static("public"));

// Handle all other routes by sending the root HTML file
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
