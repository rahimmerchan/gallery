import "./ViewPage.css";
import { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import Caption from "../components/caption.jsx";
import ImageObject from "../classes/ImageObject.js";
import React from "react";
import { useNavigate } from "react-router-dom";

function ViewPage() {

  const navigate = useNavigate();
  
  // TEMPORARY

  const img1 = new ImageObject(
    "https://i.natgeofe.com/n/0f6f9302-e62e-4841-bfd5-6cd8b96eac4a/POY1_16x9.jpg?w=1200",
    "Eagles",
    2019,
    "Four eagles in the winter.",
    "Eric"
  );
  const img2 = new ImageObject(
    "https://i.natgeofe.com/n/1ac334a0-ac4e-4745-a292-169b0a349e8b/grand-peaks-mount-cook_16x9.jpg",
    "Mountains",
    2023,
    "Misty mountains, black and white.",
    "Eric"
  );
  const img3 = new ImageObject(
    "https://mgm-website-production.oss-cn-hongkong.aliyuncs.com/uploads/2018/01/salvador-dali-1024.jpg",
    "Dali",
    1950,
    "Famous portrait of artist Salvador Dali.",
    "Eric"
  );

  // All images will be saved in a list of ImageObject elements
  const images = [img1, img2, img3];

  // State that keeps track of which image is currently being displayed
  const [page, setPage] = useState(0);
  const [showCaption, setShowCaption] = useState(false);

  // Handles inputs from left and right arrow buttons on keyboard
  const handleKeyDown = (event) => {
    const code = event.code;
    if (code == "ArrowRight" && page < images.length - 1) {
      paginate(1);
    } else if (code == "ArrowLeft" && page > 0) {
      paginate(-1);
    }
  };

  // Effect that adds an event listener everytime page is updated and removes
  // the listener once unmounted.
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [page]);

  const handleCaption = () => {
    setShowCaption(!showCaption);
  };

  // paginate(newDirection) takes input of 1 or -1 depending on the direction
  //   of the rotation. Updates page state and triggers slide transition.
  // effects:
  // *  affects state
  // *  modifies css
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

        {/* Left slide button */}
        {page > 0 && <button id="left" onClick={() => paginate(-1)}></button>}

        {/* Image being Displayed */}
        <div id="imageContainer">
          <img id="toplight" src="assets/images/toplight.png"></img>
          <img id="image" src={images[page].url}></img>
          <button id="caption" onClick={handleCaption}>
            {" "}
          </button>
        </div>

        {/* Caption button */}
        {showCaption && <Caption info={images[page % images.length]} />}
        {showCaption && (
          <div
            className="background"
            id="caption-background"
            onClick={handleCaption}
          ></div>
        )}

        {/* Right slide button */}
        {page < images.length - 1 && (
          <button id="right" onClick={() => paginate(1)}></button>
        )}

        <div className="footer" style = {{marginBottom: "1%"}}>
          <img src ="/assets/images/image-1.png" style={{ maxWidth: '5%', height: 'auto' }}/>
          <span className="fs-2 logo-name ">ImageVoyage</span>
        </div>
      </div>
    </>
  );
}

export default ViewPage;
