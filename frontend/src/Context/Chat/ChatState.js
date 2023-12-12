import React, { useState } from 'react';
import chatContext from './ChatContext'

const ChatState = (props) => {

   const user = {
    _id:"656f0754e4803eb89fdf2206",
    name:"Tarun Chandra",
    email:"tarun@gmail.com",
    pic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjXc7Er_Z6PaqEZQgRx_rAuyhBtcl2f2uxe-0sz1mc1w&s"
   }
   const [selectedChat, setSelectedChat] = useState()
   const [chats, setChats] = useState()
   const [fetchAgain,setFetchAgain] = useState(false)
  return (
    <chatContext.Provider value={{user,chats, setChats,selectedChat, setSelectedChat,fetchAgain,setFetchAgain}}>
        {props.children}
    </chatContext.Provider>
  );
}

export default ChatState;