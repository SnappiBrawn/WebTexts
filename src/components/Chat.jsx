import React, { useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const {data} = useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="chatInfo">
        <div className='chatUser'>
          <img src={data.user?.photoURL}/>
          <span>{data.user?.displayName}</span>
        </div>
        {data.user && <div className="chatIcons">
          <span className='fas fa-search'></span>
          <span className='fas fa-trash'></span>
        </div>}
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat;