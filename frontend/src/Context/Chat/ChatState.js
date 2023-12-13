import React, { useState } from 'react';
import chatContext from './ChatContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatState = (props) => {

    
  //  const user = {
  //   _id:"656f0754e4803eb89fdf2206",
  //   name:"Tarun Chandra",
  //   email:"tarun@gmail.com",
  //   pic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjXc7Er_Z6PaqEZQgRx_rAuyhBtcl2f2uxe-0sz1mc1w&s"
  //  }
   const [user,setUser] = useState()
   const [selectedChat, setSelectedChat] = useState()
   const [chats, setChats] = useState()
   const [fetchAgain,setFetchAgain] = useState(false)
   const history = useNavigate()

   useEffect(()=>{
    const usr = JSON.parse(localStorage.getItem("userInfo"))
    setUser(usr)
    if(!usr) history("/")
   },[history])
  return (
    <chatContext.Provider value={{user,setUser,chats, setChats,selectedChat, setSelectedChat,fetchAgain,setFetchAgain}}>
        {props.children}
    </chatContext.Provider>
  );
}

export default ChatState;