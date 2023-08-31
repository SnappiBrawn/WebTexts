import React from "react";
import logo from "../images/logo.jpg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () =>{
    
    const [err, setErr] = useState([false,null]);
    const navigate = useNavigate();

    const handleSubmission = async (e) =>{
        e.preventDefault();
        var email = e.target[0].value;
        var password = e.target[1].value;

        try{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErr([true,errorCode+":"+errorMessage])
            });
        }
        catch(err){
            console.log(err);
            setErr([true,"One or more fields are empty."]);
        }
    }
    return (
    <div className="formContainer">
        <div className="formWrapper">
        <img className="logo" src={logo} alt="WebTextsLogo"/>
        <span className="info"><b>Login</b></span>
        {err[0] && <span className="loginError">{err[1]}</span>}
            <form onSubmit={handleSubmission}>
                <input type="email" placeholder="Email ID" />
                <input type="password" placeholder="Password" />
                <button>Login</button>
            </form>
            <p>Don't have an account yet? Sign Up</p>
        </div>
    </div>
    );
}

export default Login;