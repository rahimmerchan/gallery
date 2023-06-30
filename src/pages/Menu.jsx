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
  const [firstRow, setFirstRow] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  function fetchPhotos() {
    fetch("http://localhost:5001/api/photos")
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
    fetchPhotos(); // Fetch the updated list of photos
  }

  useEffect(() => {
    let restOfImages = [];
    // initializing array for first row
    if (images.length > 2) {
      setFirstRow([images[0], images[1]]);
      restOfImages = images.slice(2);
    } else {
      setFirstRow(images);
    }

    // initializing 2D array for the rest of the rows
    const tempRows = [];
    for (let i = 0; i <= restOfImages.length / 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        if (i * 3 + j >= restOfImages.length) {
          break;
        }
        row.push(restOfImages[i * 3 + j]);
      }
      tempRows.push(row);
    }
    setRows(tempRows);
    console.log("cringe");
  }, [images]);

  return (
    <div className="my-body">
      <Header />
      <Title />

      {/* the first row */}
      <div className="my-row">
        <Upload onAddPhoto={openPopup} />
        <Row images={firstRow} handleOpen={openPopup} />
      </div>

      {/* all following rows */}
      {rows.map((row, i) => (
        <div className="my-row" key={i}>
          <Row images={row} handleOpen={openPopup} />
        </div>
      ))}

      {popup && <Popup image={imageSelected} handleClose={closePopup} />}

      <Foot />
    </div>
  );
}

export default Menu;
