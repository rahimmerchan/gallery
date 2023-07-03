import propTypes from "prop-types";

function Row({ images, handleOpen }) {
  return (
    <div>
      {images.map((image, i) => (
        <button
          onClick={() => {
            handleOpen(image);
          }}
          className="img"
          style={{ "--image": `url(${image.url})` }}
          // style={{ backgroundImage: `url(${image.url})` }}
          key={i}
        ></button>
      ))}
    </div>
  );
}

Row.propTypes = {
  images: propTypes.arrayOf(propTypes.object),
  handleOpen: propTypes.func,
};

export default Row;
