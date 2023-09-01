import React, { useContext, useState } from 'react';
import { db } from "../firebase";
import { collection, query, where ,doc , getDocs, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [searchName,setSearchName] = useState("");
  const [user,setUser] = useState(null);
  const [err,setErr] = useState(false);

  const {currentUser} = useContext(AuthContext)

  const userSearch = async ()=>{
    const q = query(collection(db, "users"), where("displayName", "==", searchName));
    try{
      const querySnapshot = await getDocs(q);
      if(querySnapshot.docs.length==0){
        setErr(true);
        setUser(null);
      } 
      querySnapshot.forEach((doc) => {
        setErr(false);
        setUser(doc.data());
      });
    }
    catch(error){
      console.log(error);
      setErr(true);
    }
  }

  const clearSearch = () =>{
    setErr(false);
    setUser(null);
    setSearchName("")
    document.getElementById("search-field").value="";
  }

  const triggerSearch = (e) =>{
    if(e.code === "Enter"){
      if(searchName==""){
        setErr(false);
        setUser(null);
      }
      else{
        userSearch();
      }
    }
  }

  const addChat = async () =>{
    const chatId = currentUser.uid > user.uid ? currentUser.uid+user.uid : user.uid+currentUser.uid
    try {
      const res = await getDoc(doc(db, "chats", chatId));
      if(!res.exists()){
        await setDoc(doc(db, "chats", chatId),{messages:[]})
        await updateDoc(doc(db, "userChats",currentUser.uid), {
          [chatId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [chatId+".date"]: serverTimestamp()
        });
        await updateDoc(doc(db, "userChats",user.uid), {
          [chatId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [chatId+".date"]: serverTimestamp()
        });
      }
      clearSearch();
    } 
    catch (error) {
      setErr(true);
      console.log(error);
    }
    
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <span className="fas fa-search"></span>
        <input id="search-field" type="text" placeholder='Search for a user' onKeyDown={triggerSearch} onChange={(e)=>{setSearchName(e.target.value)}}></input>
        <span className="fas fa-times" onClick={clearSearch}></span>
      </div>
      {err && <span>No such user found!</span>}
      {user && <div className="userChat" onClick={addChat}>
        <img src={user.photoURL}/>
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
      
    </div>
  )
}

export default Search;