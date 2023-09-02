import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { Timestamp } from 'firebase/firestore';

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior: 'smooth'});
  },[message])

  return (
    <div ref={ref} className={message.senderId === currentUser.uid?'message owner':'message'}>
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid?currentUser.photoURL:data.user.photoURL}/>
        <span>{message.date===Timestamp.now()?'Just Now':'Ago'}</span>
      </div>
      <div className="messageContent">
        <p>{message.msg}</p>
        {message.img && <img src={message.img}/>}
      </div>
    </div>
  )
}

export default Message;