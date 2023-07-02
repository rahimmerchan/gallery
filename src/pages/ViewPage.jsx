import "./ViewPage.css";
import { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import Caption from "../components/caption.jsx";
import ImageObject from "../classes/ImageObject.js";
import React from "react";
import { useNavigate } from "react-router-dom";

function ViewPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [showCaption, setShowCaption] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  function fetchPhotos() {
    fetch("http://localhost:5000/api/photos")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.log("Error fetching photos", error));
  }

  const handleCaption = () => {
    setShowCaption(!showCaption);
  };

  const handleKeyDown = (event) => {
    const code = event.code;
    if (code === "ArrowRight" && page < images.length - 1) {
      paginate(1);
    } else if (code === "ArrowLeft" && page > 0) {
      paginate(-1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [page]);

  const paginate = (newDirection) => {
    if (newDirection > 0) {
      document.getElementById("imageContainer").style.animation =
        "right_image_exit 0.5s ease-in";
    } else {
      document.getElementById("imageContainer").style.animation =
        "left_image_exit 0.5s ease-in";
    }

    setTimeout(() => {
      setPage(page + newDirection);

      if (newDirection > 0) {
        document.getElementById("imageContainer").style.animation =
          "right_image_enter 0.5s ease-out";
      } else {
        document.getElementById("imageContainer").style.animation =
          "left_image_enter 0.5s ease-out";
      }
    }, 480);
  };

  return (
    <>
      <div className="background">
        <div className="my-nav" id="view-nav">
          <button id="gallery-button" onClick={() => navigate("/menu")}>
            My Gallery
          </button>
          <button id="view-button">View</button>
        </div>

        {page > 0 && <button id="left" onClick={() => paginate(-1)}></button>}

        <div id="imageContainer">
          <img id="toplight" src="assets/images/toplight.png"></img>
          {images.length > 0 && (
            <img id="image" src={images[page % images.length].url}></img>
          )}
          {images.length > 0 && (
            <button id="caption" onClick={handleCaption}></button>
          )}
        </div>

        {showCaption && <Caption info={images[page % images.length]} />}
        {showCaption && (
          <div
            className="background"
            id="caption-background"
            onClick={handleCaption}
          ></div>
        )}

        {page < images.length - 1 && (
          <button id="right" onClick={() => paginate(1)}></button>
        )}

        <div className="footer" style={{ marginBottom: "1%" }}>
          <img
            src="/assets/images/image-1.png"
            style={{ maxWidth: "5%", height: "auto" }}
          />
          <span className="fs-2 logo-name ">ImageVoyage</span>
        </div>
      </div>
    </>
  );
}

export default ViewPage;
