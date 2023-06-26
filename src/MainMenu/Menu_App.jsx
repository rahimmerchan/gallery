import Header from './component/Header'
import './Menu.css'
import Upload from './component/Upload'
import Title from './component/Title';
import Images1 from './component/Images1';
import Images2 from './component/Images2';
import Foot from './component/Foot';

function App() {
  return (
    <>
      <Header />
      <Title />
      <div className='first'>
        <Upload />
        <Images1 />
      </div>
      <div className='second'>
        <Images2 />
      </div>
      <Foot />
    </>
  );
}
export default App
