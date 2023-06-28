import Header from '../MainMenu/component/Header'
import './Menu.css'
import Upload from '../MainMenu/component/Upload'
import Title from '../MainMenu/component/Title';
import Images1 from '../MainMenu/component/Images1';
import Images2 from '../MainMenu/component/Images2';
import Foot from '../MainMenu/component/Foot';

function Menu() {
  return (
    <>
      <Header />
      <div style = {{position:"absolute", top:"7%"}}>
        <Title />
        <div className='first'>
          <Upload />
          <Images1 />
        </div>
        <div className='second'>
          <Images2 />
        </div>
        <Foot />
      </div>
    </>
  );
}
export default Menu;
