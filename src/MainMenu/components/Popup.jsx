import { useState, useEffect } from "react";
import "./Popup.css";

function Popup({ image, handleClose }) {
  const [photo, setPhoto] = useState(image ? image : null);

  const handleSave = () => {
    // send data to api
    console.log(photo.name);
    handleClose();
  };

  const handleDelete = () => {
    handleClose();
  };

  function handleUpload(event) {
    if (event.target.files[0]) {
      setPhoto((prevPhoto) => ({
        ...prevPhoto,
        url: URL.createObjectURL(event.target.files[0]),
      }));
    }
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

  return (
    <>
      <div className="backdrop">
        <div id="popup">
          <div className="container" id="content-container">
            {/* Photo section */}
            <div className="container" id="photo-container">
              {/* Photo uploader */}
              <input id="uploader" type="file" onChange={handleUpload} />

              {/* Custom UI for the photo uploader*/}
              <label htmlFor="uploader" className="photo-upload">
                {/*When photo is uploaded, it is displayed*/}
                {photo && photo.url ? (
                  <img className="photo" src={photo.url} />
                ) : (
                  <img src="/assets/images/upload.svg" id="upload-symbol" />
                )}
              </label>
            </div>

            <div className="container" id="input-container">
              <label>Title</label>
              <input
                type="text"
                value={photo ? photo.title : ""}
                onChange={handleTitle}
              ></input>
              <label>Year</label>
              <input
                type="text"
                value={photo ? photo.year : ""}
                onChange={handleYear}
              ></input>
              <label>Description</label>
              <textarea
                rows="3"
                value={photo ? photo.desc : ""}
                onChange={handleDesc}
                id="desc"
              ></textarea>
            </div>
          </div>

          {/* Save and delete button section */}
          <div className="container" id="button-container">
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
