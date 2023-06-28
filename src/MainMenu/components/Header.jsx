import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function openPage1() {
    navigate("/menu");
  }

  function openPage2() {
    navigate("/viewpage");
  }

  return (
    <>
      <div className="my-nav" id="gallery-nav">
        <button id="gallery-button">My Gallery</button>
        <button id="view-button" onClick={openPage2}>View</button>
      </div>
    </>
  );
}

export default Header;
