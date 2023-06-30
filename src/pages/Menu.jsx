import { useState, useEffect } from "react";
import Popup from "/src/MainMenu/components/Popup.jsx";
import Header from "/src/MainMenu/components/Header";
import Upload from "/src/MainMenu/components/Upload";
import Title from "/src/MainMenu/components/Title";
import Row from "/src/MainMenu/components/Row";
import Foot from "/src/MainMenu/components/Foot";
import ImageObject from "/src/classes/Imageobject.js";
import "./Menu.css";
import "./nav.css";

function Menu() {
  const [popup, setPopup] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  function fetchPhotos() {
    fetch("http://localhost:5000/api/photos")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.log("Error fetching photos", error));
  }

  function openPopup(image) {
    setPopup(true);
    setImageSelected(image);
  }

  function closePopup() {
    setPopup(false);
    setImageSelected(null); // Reset the selected image
  }

  async function handleDeletePhoto() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/photos/${imageSelected.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchPhotos(); // Fetch the updated list of photos
        closePopup(); // Close the popup after deleting the photo
      } else {
        console.log("Error deleting photo");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  function onAddPhoto(photoData) {
    // Handle adding photo logic here
    console.log("New photo data:", photoData);
    // You can update the `images` state with the new photo if needed
  }

  return (
    <div className="my-body">
      <Header />
      <Title />

      {/* the first row */}
      <div className="my-row">
        <Upload onAddPhoto={openPopup} />
        <Row images={images} handleOpen={openPopup} />
      </div>

      {popup && (
        <Popup
        image={imageSelected}
        handleClose={closePopup}
        onAddPhoto={onAddPhoto} // Pass the onAddPhoto function
        onDeletePhoto={handleDeletePhoto}
      />
      )}

      <Foot />
    </div>
  );
}

export default Menu;
