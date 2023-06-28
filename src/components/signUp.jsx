import React from 'react';
import './login.css';
import { useState } from 'react';
import { useEffect } from 'react';

function signUp() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState("");

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    useEffect(() => {
        if(emailValid && pwValid) {
          setNotAllow(false);
          return;
        }
        setNotAllow(true);
      }, [emailValid, pwValid]);
  
    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex =
          /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(e.target.value)) {
          setEmailValid(true);
        } else {
          setEmailValid(false);
        }
      };

    const handelPassword = (e) => {
        setPw(e.target.value);
        const regex =
          /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(e.target.value)) {
          setPwValid(true);
        } else {
          setPwValid(false);
        }
      };

    const onClickConfirmButton = () => {
        if(email === User.email && pw === User.pw) {
            alert('You are logged in!');
        } else {
            alert('Email or Password is incorrect');
        }
    }

    return (
        <div className = "page">
            <div className = "titleWrap">
                Please enter you emaill and password       
            </div>

            <div className = "contentWrap">
                <div className = "inputTitle">Email</div>
                <div className = "inputWrap">
                    <input 
                    type = 'text'
                    className = "input" 
                    placeholder = "validEmail@gmail.com" 
                    value = {email} 
                    onChange = {handleEmail}/>
                </div>
                <div className = "errorMessageWrap">
                    {!emailValid && email.length > 0 && (
                        <div> Please enter a valid email address </div>
                        )}
                </div>

                <div style = {{marginTop: "26px" }} className = "inputTitle">Password</div>
                <div className = "inputWrap">
                    <input 
                    type = 'password'
                    className = "input" 
                    placeholder = "At least 8 characters including Uppercase, Lowercase, Number"
                    value = {pw} 
                    onChange = {handelPassword}/>
                </div>
                <div className = "errorMessageWrap">
                    {!pwValid && pw.length > 0 && (
                        <div>Please enter at least 8 characters including Uppercase, Lowercase, Number.</div>
                    )
                    }                   
                </div>
            </div>

            <div>
                <button onClick = {onClickConfirmButton} disabled = {notAllow} className = "bottomButton">Log in</button>
            </div>
        </div>
    )
}

export default signUp;