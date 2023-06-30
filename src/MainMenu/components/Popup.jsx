import React, { useState, useEffect, useRef } from "react";
import "./Popup.css";

function Popup({ image, handleClose, onAddPhoto, onDeletePhoto }) {
  const [photo, setPhoto] = useState({
    url: image ? image.url : "",
    title: image ? image.title : "",
    year: image ? image.year : "",
    desc: image ? image.desc : ""
  });

  useEffect(() => {
    setPhoto({
      url: image ? image.url : "",
      title: image ? image.title : "",
      year: image ? image.year : "",
      desc: image ? image.desc : ""
    });
  }, [image]);

  const titleInput = useRef();
  const descriptionInput = useRef();
  const imageInput = useRef();
  const [saveInProgress, setSaveInProgress] = useState(false);

  function handleApi(e) {
    const file = e.target.files[0];
    setPhoto((prevPhoto) => ({
      ...prevPhoto,
      url: URL.createObjectURL(file)
    }));
  }

  async function handleSave() {
    if (saveInProgress) {
      return;
    }

    setSaveInProgress(true);

    const newPhoto = {
      title: photo.title,
      year: photo.year,
      desc: photo.desc,
      url: photo.url
    };

    try {
      const response = await fetch("http://localhost:5000/api/photos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPhoto)
      });

      if (response.ok) {
        const data = await response.json();
        onAddPhoto(data); // Update images state in the Menu component
        closePopup();
      } else {
        console.log("Error saving photo");
      }
    } catch (error) {
      console.log("Error:", error.message);
    } finally {
      setSaveInProgress(false);
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/photos/${image.id}`,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {
        onDeletePhoto(image.id);
        closePopup();
      } else {
        console.log("Error deleting photo");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  function handleTitle(event) {
    setPhoto((prevPhoto) => ({
      ...prevPhoto,
      title: event.target.value
    }));
  }

  function handleYear(event) {
    setPhoto((prevPhoto) => ({
      ...prevPhoto,
      year: event.target.value
    }));
  }

  function handleDesc(event) {
    setPhoto((prevPhoto) => ({
      ...prevPhoto,
      desc: event.target.value
    }));
  }

  function closePopup() {
    handleClose();
  }

  return (
    <div className="backdrop">
      <div id="popup">
        <div className="my-container" id="content-container">
          {/* Photo section */}
          <div className="my-container" id="photo-container">
            {/* Photo uploader */}
            <input id="uploader" type="file" onChange={handleApi} />

            {/* Custom UI for the photo uploader*/}
            <label htmlFor="uploader" className="photo-upload">
              {/*When photo is uploaded, it is displayed*/}
              {photo.url ? (
                <img className="photo" src={photo.url} alt="Uploaded" />
              ) : (
                <img
                  src="/assets/images/upload.svg"
                  id="upload-symbol"
                  alt="Upload"
                />
              )}
            </label>
          </div>

          <div className="my-container" id="input-container">
            <label>Title</label>
            <input
              type="text"
              value={photo.title}
              onChange={handleTitle}
              ref={titleInput}
            ></input>
            <label>Year</label>
            <input
              type="text"
              value={photo.year}
              onChange={handleYear}
              ref={descriptionInput}
            ></input>
            <label>Description</label>
            <textarea
              rows="3"
              value={photo.desc}
              onChange={handleDesc}
              id="desc"
              ref={imageInput}
            ></textarea>
          </div>
        </div>

        {/* Save and delete button section */}
        <div className="my-container" id="button-container">
          <button onClick={handleSave} id="save" disabled={saveInProgress}>
            Save
          </button>

          <button onClick={handleDelete} id="delete">
            Delete
          </button>
        </div>
        <button className="close-button" onClick={handleClose}>
          X
        </button>
      </div>
    </div>
  );
}

export default Popup;
