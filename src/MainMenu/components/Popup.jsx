import { useState, useEffect } from "react";
import "./Popup.css";
import axios from 'axios';

function Popup({ image, handleClose }) {
  const [photo, setPhoto] = useState({
    title: "",
    year: "",
    desc: "",
    url: image ? image.url : null
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setPhoto(prevPhoto => ({
      ...prevPhoto,
      url: image ? image.url : null,
    }));
  }, [image]);

  const handleSave = () => {
    if (selectedFile) {
      const fd = new FormData();
      fd.append('image', selectedFile);
      axios.post('/api/photos', fd)
        .then(res => {
          const imageUrl = res.data.url;
          setPhoto(prevPhoto => ({
            ...prevPhoto,
            url: imageUrl,
          }));
          // Perform any necessary actions after successful upload
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          // Handle error case
        });
    }
  }

  const handleDelete = () => {
    setPhoto({
      title: "",
      year: "",
      desc: "",
      url: null
    });
    handleClose();
  };

  const handleUpload = event => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setPhoto(prevPhoto => ({
        ...prevPhoto,
        url: URL.createObjectURL(event.target.files[0]),
      }));
    }
  }

  const handleTitle = event => {
    setPhoto(prevPhoto => ({
      ...prevPhoto,
      title: event.target.value,
    }));
  }

  const handleYear = event => {
    setPhoto(prevPhoto => ({
      ...prevPhoto,
      year: event.target.value,
    }));
  }

  const handleDesc = event => {
    setPhoto(prevPhoto => ({
      ...prevPhoto,
      desc: event.target.value,
    }));
  }

  return (
    <>
      <div className="backdrop">
        <div id="popup">
          <div className="my-container" id="content-container">
            {/* Photo section */}
            <div className="my-container" id="photo-container">
              {/* Photo uploader */}
              <input id="uploader" type="file" onChange={handleUpload} />

              {/* Custom UI for the photo uploader*/}
              <label htmlFor="uploader" className="photo-upload">
                {/*When photo is uploaded, it is displayed*/}
                {photo && photo.url ? (
                  <img className="photo" src={photo.url} alt="Uploaded" />
                ) : (
                  <img src="/assets/images/upload.svg" id="upload-symbol" alt="Upload" />
                )}
              </label>
            </div>

            <div className="my-container" id="input-container">
              <label>Title</label>
              <input
                type="text"
                value={photo.title}
                onChange={handleTitle}
              ></input>
              <label>Year</label>
              <input
                type="text"
                value={photo.year}
                onChange={handleYear}
              ></input>
              <label>Description</label>
              <textarea
                rows="3"
                value={photo.desc}
                onChange={handleDesc}
                id="desc"
              ></textarea>
            </div>
          </div>

          {/* Save and delete button section */}
          <div className="my-container" id="button-container">
            <button onClick={handleSave} id="save">
              Save
            </button>

            <button onClick={handleDelete} id="delete">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;
