import React from "react";
import logo from "../images/logo.jpg";
import placeholder from "../images/profile_upload_placeholder.png";

const Register = () =>{
    return (
    <div className="formContainer">
        <div className="formWrapper">
        <img className="logo" src={logo} alt="WebTextsLogo"/>
        <span className="info"><b>Register</b></span>
            <form>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email ID" />
                <input type="password" placeholder="Password" />
                <input type="file" id="profilePic" hidden/>
                <label htmlFor="profilePic"><img height="30" src={placeholder}/><span>Pick an Avatar</span></label>
                <button>Sign Up</button>
            </form>
            <p>Do you already have an account? Sign In</p>
        </div>
    </div>
    );
}

export default Register;