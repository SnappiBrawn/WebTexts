import React from 'react'
import logo from '../images/logo.png';
import logosmall from '../images/logo-small.png';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; 

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
  const logout = () =>{
    signOut(auth);
  }
  
  return (
    <div className='navbar'>
      <img src={logo} className='logo-main'/>
      <img src={logosmall} className='logo-small'/>
      <div className="user">
      <img src={currentUser.photoURL}/>
        <span>{currentUser.displayName}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar;