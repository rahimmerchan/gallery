import React, { useState, useEffect, useRef } from "react";
import "./Popup.css";

function Popup({ image, handleClose }) {
  const inDatabase = image ? true : false;
  const [saveInProgress, setSaveInProgress] = useState(false);
  const [photo, setPhoto] = useState({
    url: image ? image.url : null,
    title: image ? image.title : "",
    year: image ? image.year : "",
    desc: image ? image.desc : "",
  });

  function handlePhoto(e) {
    const file = e.target.files[0];
    setPhoto((prevPhoto) => ({
      ...prevPhoto,
      url: URL.createObjectURL(file),
    }));
  }

  function handleTitle(event) {
    setPhoto((prevPhoto) => ({
      ...prevPhoto,
      title: event.target.value,
    }));
  }

  function handleYear(event) {
    setPhoto((prevPhoto) => ({
      ...prevPhoto,
      year: event.target.value,
    }));
  }

  function handleDesc(event) {
    setPhoto((prevPhoto) => ({
      ...prevPhoto,
      desc: event.target.value,
    }));
  }

  function handleCancel() {
    closePopup();
  }

  async function handleSave() {
    if (saveInProgress) {
      return;
    }
    if (!(photo && photo.url)) {
      console.log("CANNOT SAVE WITHOUT AN IMAGE");
      return;
    }
    setSaveInProgress(true);

    const newPhoto = {
      title: photo.title,
      year: photo.year,
      desc: photo.desc,
      url: photo.url,
    };

    try {
      let response = null;
      if (inDatabase) {
        // if photo was already in database, use put method to edit it
        console.log("editing " + image.id);
        response = await fetch(`http://localhost:5001/api/photos/${image.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(photo),
        });
      } else {
        // if photo wasn't already in database, use post method to add a new photo
        response = await fetch(`http://localhost:5001/api/photos/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(photo),
        });
      }
      if (response.ok) {
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
    if (!(photo && photo.url) || !inDatabase) {
      closePopup();
      return;
    }

    try {
      console.log("deleting " + image.id);
      const response = await fetch(
        `http://localhost:5001/api/photos/${image.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        closePopup(); // Close the popup after deleting the photo
      } else {
        console.log("Error deleting photo");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  function closePopup() {
    handleClose();
  }

  return (
    <div className="backdrop" data-testid="popup">
      <div id="popup">
        <div className="my-container" id="content-container">
          {/* Photo section */}
          <div className="my-container" id="photo-container">
            {/* Photo uploader */}
            <input id="uploader" type="file" onChange={handlePhoto} />

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
            ></input>
            <label>Year</label>
            <input type="text" value={photo.year} onChange={handleYear}></input>
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
          <button onClick={handleSave} id="save" disabled={saveInProgress}>
            Save
          </button>

          <button onClick={handleDelete} id="delete">
            Delete
          </button>
          <button onClick={handleCancel} id="cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
