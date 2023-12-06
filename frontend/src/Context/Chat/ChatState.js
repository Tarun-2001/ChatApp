import React, { useState } from 'react';
import chatContext from './ChatContext'

const ChatState = (props) => {

   const user = "abcd"
    // setUser("abcd")
  return (
    <chatContext.Provider value={{user}}>
        {props.children}
    </chatContext.Provider>
  );
}

export default ChatState;
