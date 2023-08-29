import React from 'react';
import Messages from './Messages';
import Input from './Input';

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <div className='chatUser'>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.goodfreephotos.com%2Fcache%2Fpeople%2Fbeautiful-woman-with-blonde-hair-with-green-eyes_w80_h80_cw80_ch80_thumb.jpg%3Fcached%3D1524708655&f=1&nofb=1&ipt=7854461e7b9c82ac3797efd74673cd5a75da4c188520958b37a03f80b559bed7&ipo=images"/>
          <span>Johnathan Joestar</span>
        </div>
        <div className="chatIcons">
          <span className='fas fa-search'></span>
          <span className='fas fa-trash'></span>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat;