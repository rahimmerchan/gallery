import 'reactjs-popup/dist/index.css';
import './captions.css'

function Caption(props) {

  return(
    <>
    <div id = "captionContainer">
      <div id = "captionPopup">
          <div className='content' style = {{ color:"black", margin:"50px"}}>
              <p style = {{fontWeight: "bold", fontSize: "32px", marginBottom: "2px"}}> {props.info.author} </p>
              <p style = {{ fontSize: "32px", marginTop: "2px"}}><strong><em>{props.info.title}</em>, </strong>{props.info.year}</p>
              <p style = {{ fontSize: "25px" }}> {props.info.desc}</p>
          </div>
      </div>
    </div>
    </>
  )
}

export default Caption;