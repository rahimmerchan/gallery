import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  function openPage(path) {
    navigate(path);
  }

  function openSignUp() {
    navigate('/signUp');
  }
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 ">
      <div className="col-md-2 mb-2 mb-md-0 px-5 py-2" >
        <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
          <img src ="/assets/images/image-1.png" style={{ maxWidth: '35%', height: 'auto' }}/>
          <span className="fs-2 logo-name ">ImageVoyage</span>
        </a>
      </div>

      
      <div className="col-md-3 text-end mx-3">
      <button type="button" className="btn me-2 button-outline" onClick={() => openPage('/login')}>Login</button>
        <button type="button" className="btn button-color button-outline"  onClick={openSignUp}>Sign-up</button>
      </div>
    </header>
  );
    
}


export default Header;


