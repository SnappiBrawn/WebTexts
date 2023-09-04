import React, { useContext, useState } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, storage } from '../firebase';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import {v4 as uuid} from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const [textMessage,setTextMessage] = useState("");
  const [attachMessage,setAttachMessage] = useState(null);
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const send = async()=>{
    document.getElementById("messagego").value="";
    if(!(textMessage==="")){
      if(attachMessage){
        const storageRef = ref(storage,uuid());
        const uploadTask =  uploadBytesResumable(storageRef, attachMessage);
        uploadTask.on("state_changed",{
          'next':(snapshot)=>{}, 
          'error': (error)=>{},
          'complete':(response) => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateDoc(doc(db,"chats",data.chatId),{
                  messages: arrayUnion({
                    id: uuid(),
                    msg:textMessage,
                    img:downloadURL,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })});

              });
            }
          }

        )
      }
      else{
        await updateDoc(doc(db,"chats",data.chatId),{
          messages: arrayUnion({
            id: uuid(),
            msg:textMessage,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [data.chatId+".recentMsg"]:{textMessage},
        [data.chatId+".date"]:serverTimestamp(),
      });

      await updateDoc(doc(db,"userChats",data.user.uid),{
        [data.chatId+".recentMsg"]:{textMessage},
        [data.chatId+".date"]:serverTimestamp(),
      });
    
      setTextMessage("");
      setAttachMessage(null);
    }else{
      console.log("else ran")
    }
  }
  return (
    <div className='input'>
      <input type='text' placeholder='Type a message' id="messagego" onKeyDown={(e)=>{e.key==="Enter" && send()}} onChange={e=>{setTextMessage(e.target.value)}}></input>
      <div className="send">
        <span className="fas fa-image"/>
        <input type='file' id='attachment' style={{display:"none"}} onChange={e=>setAttachMessage(e.target.files[0])} />
        <label htmlFor='attachment'>
          <span className="fas fa-paperclip"/>
        </label>
        <button onClick={send}><span className="fas fa-paper-plane"/> </button>
      </div>
    </div>
  )
}

export default Input;