import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  function openPage() {
    navigate("/menu");
  }
  return (
    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6 d-flex justify-content-center">
        <img
          src="/assets/images/image-7.png"
          className="d-block mx-lg-auto img-fluid custom-image"
          alt="Bootstrap Themes"
          width="600"
          height="auto"
          loading="lazy"
          style={{ marginTop: "-150px" }}
        />
      </div>
      <div className="col-lg-6 py-5">
        <h1
          className="display-5 fw-bold text-body-emphasis lh-1 mb-4 px-5"
          style={{ fontSize: "80px" }}
        >
          <span>Transforming</span> <br />
          <span style={{ marginLeft: "10px" }}>Ideas into Visual</span> <br />
          Triumphs<span className="text-color">.</span>
        </h1>
        <h2
          className="lead px-5 mb-4"
          style={{ fontSize: "30px", marginLeft: "10px" }}
        >
          Unlock Your Creativity and <br />
          Design Your Own Stunning Online Gallery
          <span className="text-color">.</span>
        </h2>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start px-5">
          <button
            type="button"
            className="btn button-color btn-lg px-4 me-md-2 circular-button"
            onClick={openPage}
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="container text-center">
        <div
          className="d-flex justify-content-center"
          style={{ marginLeft: "57%%", marginTop: "-60px" }}
        >
          <div>
            <a href="https://github.com/ericnem" target="_blank">
              <img
                src="/assets/images/eric-icon-image.png"
                height="50px"
                className="icon-space circular-button"
              />
            </a>
          </div>
          <div>
            <a href="https://github.com/rahimmerchan" target="_blank">
              <img
                src="/assets/images/rahim-icon-image.png"
                height="50px"
                className="icon-space circular-button"
              />
            </a>
          </div>
          <div>
            <a href="https://github.com/bryanjiang117" target="_blank">
              <img
                src="/assets/images/bryan-icon-image.jpg"
                height="50px"
                className="icon-space circular-button"
              />
            </a>
          </div>
          <div>
            <a href="https://github.com/Jolin816" target="_blank">
              <img
                src="/assets/images/image-12.png"
                height="50px"
                className="icon-space circular-button"
              />
            </a>
          </div>
          <div>
            <a href="https://github.com/torigood" target="_blank">
              <img
                src="/assets/images/kwansik-icon-image.png"
                height="50px"
                className="icon-space circular-button"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
