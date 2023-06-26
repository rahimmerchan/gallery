import { useNavigate } from 'react-router-dom';

function Upload() {

    const navigate = useNavigate();

    function openPage() {
        navigate('/newpage');
    }

    return (
        <>
            <button 
                className="upload"
                onClick={openPage}
            >+</button>
        </>
    )
}

export default Upload