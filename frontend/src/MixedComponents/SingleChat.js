import React, { useContext, useEffect, useState } from 'react';
import chatContext from '../Context/Chat/ChatContext';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../Components/Config/Logic';
import ProfileModal from './ProfileModal';
import GroupChatUpdate from './GroupChatUpdate';
import ScrollChat from './ScrollChat';
import io from 'socket.io-client'
import "../style.css"
const ENDPOINT= 'http://localhost:5000';
var socket,selectedChatCompare;
const SingleChat = () => {
    const context = useContext(chatContext)
    const {user,selectedChat,setSelectedChat,fetctAgain,setFetchAgain} = context
    const [messages,setMessages] = useState([])
    const [loading,setLoading] = useState(false)
    const [newMessage , setNewMessage] = useState()
    const [socketConnected,setSocketConnected] = useState(false)
    const toast = useToast()

   


    const typingHandle = (e)=>{
      setNewMessage(e.target.value)
    }

    const fetchMessage = async () =>{
      try{
        if(!selectedChat) return
        setLoading(true)
        const data = await fetch(`http://localhost:5000/api/message/${selectedChat._id}`,{
        method:"GET",
        headers:{
          "auth-token":user.token
        }
      })
      const resp = await data.json()
      setMessages(resp)
      setLoading(false)
      socket.emit('join chat',selectedChat._id)
      }
      catch(err){
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
      }

    }
    const sendMessage = async (event)=>{
      if(event.key==="Enter"&&newMessage){
        try{
          setNewMessage("")
          const data = await fetch('http://localhost:5000/api/message',{
            method:"POST",
            headers:{
              "Content-Type": "application/json",
              "auth-token":user.token,
            },
            body:JSON.stringify({
              "Content":newMessage,
              "ChatId":selectedChat._id
            })
          })
          const resp = await data.json()
          socket.emit('new message',resp)
          setMessages([...messages,resp])
        }catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to send the Message",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
        }
      }
    }


    useEffect(()=>{
      socket = io(ENDPOINT)
      socket.emit("setUp",user)
      socket.on("connection",()=>setSocketConnected(true))
    },[])

    useEffect(()=>{
      fetchMessage()
      selectedChatCompare = selectedChat
    },[selectedChat])


    useEffect(()=>{
      socket.on('message recieved',(newmsg)=>{
        if(!selectedChatCompare||selectedChatCompare._id!==newmsg.ChatId._id){
          //notify
        }else{
          
          setMessages([...messages,newmsg])
        }
      })
    })
    
   
  return (
    <>
      {selectedChat?(<>
        <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
            display={{base:"flex",md:"none"}}
            icon={<ArrowBackIcon/>}
            onClick={()=>{setSelectedChat("")}}
            />
            {!selectedChat.isGroupChat?(
                <>
                {getSender(user,selectedChat.users)}
                <ProfileModal user={getSenderFull(user,selectedChat.users)}/>
                </>
            ):(
                <>{selectedChat.chatName.toUpperCase()}
                <GroupChatUpdate fetchMessage = {fetchMessage}></GroupChatUpdate>
                </>
                
            )}
        </Text>
        <Box  
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden">
              {loading?<Spinner 
              size={"xl"}
              w={20}
              h={20}
              alignSelf={"center"}
              margin={"auto"}
              />:(
              <div className='message'>
                <ScrollChat messages = {messages}/>
              </div>
              )}
              <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                <Input
                variant = "filled"
                bg={"#E0E0E0"}
                placeholder='Enter Your Message Here'
                onChange={typingHandle}
                value={newMessage}
                />
              </FormControl>

            </Box>
        </>):(<Box display={"flex"} alignItems={"center"} justifyContent={"center"} h={"100%"}>
        <Text fontSize = "3xl" pb={3} > Select chat to start chating!!!</Text>
       </Box>)
       }
    </>
  );
}

export default SingleChat;
