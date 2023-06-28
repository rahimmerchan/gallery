import { useState } from "react";
import Popup from "/src/MainMenu/components/Popup.jsx";
import Header from "/src/MainMenu/components/Header";
import Upload from "/src/MainMenu/components/Upload";
import Title from "/src/MainMenu/components/Title";
import Row from "/src/MainMenu/components/Row";
import Foot from "/src/MainMenu/components/Foot";
import ImageObject from "/src/classes/Imageobject.js";
import "./Menu.css";

function App() {

  document.body.style.overflow = "visible"

  const [popup, setPopup] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);

  // (temporary) this will eventually be an api call that gets all of the images made by this author
  let images = [
    new ImageObject(
      "/assets/images/1.jpg",
      "title",
      "2023",
      "aesthetic photo",
      "jolin"
    ),
    new ImageObject(
      "/assets/images/1.jpg",
      "title",
      "2023",
      "aesthetic photo",
      "jolin"
    ),
    new ImageObject(
      "/assets/images/1.jpg",
      "title",
      "2023",
      "aesthetic photo",
      "jolin"
    ),
    new ImageObject(
      "/assets/images/1.jpg",
      "title",
      "2023",
      "aesthetic photo",
      "jolin"
    ),
    new ImageObject(
      "/assets/images/1.jpg",
      "title",
      "2023",
      "aesthetic photo",
      "jolin"
    ),
  ];

  function openPopup(image) {
    if (image) {
      setImageSelected(image);
    } else {
      setImageSelected(null);
    }
    setPopup(true);
  }

  function closePopup() {
    setPopup(false);
  }

  // initializing the first row
  let firstRow = [];
  if (images.length > 2) {
    firstRow.push(images[0]);
    firstRow.push(images[1]);
    images = images.slice(2);
  } else {
    firstRow = images;
  }

  // initializing 2D array for the rest of the rows
  let rows = [];
  for (let i = 0; i <= images.length / 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      if (i * 3 + j >= images.length) {
        break;
      }
      row.push(images[i * 3 + j]);
    }
    rows.push(row);
  }

  return (
    <>
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
    </>
  );
}
export default App;
