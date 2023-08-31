import React, { useState } from "react";
import logo from "../images/logo.jpg";
import placeholder from "../images/profile_upload_placeholder.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const Register = () =>{

    const [err, setErr] = useState([false,null]);
    const navigate = useNavigate();

    const handleSubmission = async (e) =>{
        e.preventDefault();
        var username = e.target[0].value;
        var email = e.target[1].value;
        var password = e.target[2].value;
        var profile = e.target[3].files[0];

        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, username);

            const uploadTask =  uploadBytesResumable(storageRef, profile);

            uploadTask.on('state_changed',{
                'next':(snapshot)=>{
                    document.querySelector('.loader').style.display = "flex";
                }, 
                'error': (error)=>{
                    setErr([true,error]);
                },
                'complete':(response) => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user,{displayName:username, photoURL:downloadURL,});
                        await setDoc(doc(db,"users",res.user.uid),{
                            uid: res.user.uid,
                            displayName: username,
                            email,
                            photoURL: downloadURL,               
                        });
                        await setDoc(doc(db,"userChats",res.user.uid),{});
                    });
                    document.querySelector('.loader').style.display = "none";
                    navigate("/home");
                }}   
            );
            
        }
        catch(err){
            console.log(err);
            setErr([true,"Oops! Something went wrong..."]);
        }
    }

    return (
    <div className="formContainer">
        <div className="loader" style={{display:"none"}}>Please wait</div>
        <div className="formWrapper">
        <img className="logo" src={logo} alt="WebTextsLogo"/>
        <span className="info"><b>Register</b></span>
            <form onSubmit={handleSubmission}>
                {err[0] && <span className="loginError">{err[1]}</span>}
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