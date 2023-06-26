import { useState } from "react";

function Images2() {

    const [hover1, setHover1] = useState(false)
    const [hover2, setHover2] = useState(false)
    const [hover3, setHover3] = useState(false)


    function handleMouseEnter1() {
        setHover1(true);
    }

    function handleMouseEnter2() {
        setHover2(true);
    }

    function handleMouseEnter3() {
        setHover3(true);
    }

    function handleMouseLeave1() {
        setHover1(false);
    }

    function handleMouseLeave2() {
        setHover2(false);
    }

    function handleMouseLeave3() {
        setHover3(false);
    }

    const source1 = hover1 ? "src/MainMenu/component/images/edit.png" : "src/MainMenu/component/images/3.jpg"
    const source2 = hover2 ? "src/MainMenu/component/images/edit.png" : "src/MainMenu/component/images/4.jpg"
    const source3 = hover3 ? "src/MainMenu/component/images/edit.png" : "src/MainMenu/component/images/5.jpg"

    return (
        <>
            <img
                onMouseEnter={handleMouseEnter1}
                onMouseLeave={handleMouseLeave1} 
                src={source1}
            ></img>
            <img
                onMouseEnter={handleMouseEnter2}
                onMouseLeave={handleMouseLeave2}  
                src={source2}
            ></img>
            <img
                onMouseEnter={handleMouseEnter3}
                onMouseLeave={handleMouseLeave3}  
                src={source3}
            ></img>
        </>
    )
}

export default Images2