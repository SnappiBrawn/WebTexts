import React from 'react'

const Input = () => {
  return (
    <div className='input'>
      <input type='text' placeholder='Type a message'></input>
      <div className="send">
        <span className="fas fa-image"/>
        <input type='file' id='attachment' style={{display:"none"}}/>
        <label htmlFor='attachment'>
          <span className="fas fa-paperclip"/>
        </label>
        <button> <span className="fas fa-paper-plane"/> </button>
      </div>
    </div>
  )
}

export default Input;