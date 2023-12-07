import React, { useState } from 'react';
import chatContext from './ChatContext'

const ChatState = (props) => {

   const user = {
    name:"Tarun Chandra",
    email:"tarun@gmail.com",
    pic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjXc7Er_Z6PaqEZQgRx_rAuyhBtcl2f2uxe-0sz1mc1w&s"
   }
    // setUser("abcd")
  return (
    <chatContext.Provider value={{user}}>
        {props.children}
    </chatContext.Provider>
  );
}

export default ChatState;