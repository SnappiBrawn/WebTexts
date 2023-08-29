import React from "react";
import logo from "../images/logo.jpg";

const Login = () =>{
    return (
    <div className="formContainer">
        <div className="formWrapper">
        <img className="logo" src={logo} alt="WebTextsLogo"/>
        <span className="info"><b>Login</b></span>
            <form>
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