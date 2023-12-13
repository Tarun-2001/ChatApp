import React, { useContext,useEffect, useState } from 'react';
import chatContext from '../Context/Chat/ChatContext';
import { Avatar, Box, Stack, Text, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/button';
import { getProile, getSender } from './Config/Logic';
import ChatLoading from '../MixedComponents/ChatLoading';
import GroupChat from '../MixedComponents/GroupChat';

const MyChats = () => {
  const context = useContext(chatContext)
  const {user,chats,setChats,selectedChat, setSelectedChat,fetchAgain} = context;
  const toast = useToast()
  const [currentUser,setCurrentUser] = useState()
  const fetchChats = async ()=>{
   try{
    const data = await fetch('http://localhost:5000/api/chat',{
      method:'GET',
      headers:{
        "auth-token":user.token
    }
    })
    const resp = await data.json()
    setChats(resp)
   }catch(error){
    toast({
      title:"Failed to load search data",
      status: "warning",
      duration: 2000,
      isClosable:true,
      position:'top-left'
    })
   }
  }

    useEffect(() => {
      setCurrentUser(JSON.parse(localStorage.getItem("userInfo")))
      fetchChats();
  }, [fetchAgain]);

  return (
    <Box
    display={{base:selectedChat?"none":"flex",md:"flex"}}
    flexDir="column"
    alignItems="center"
    p={3}
    bg="white"
    w={{base:"100%", md:"31%"}}
    borderRadius="lg"
    borderWidth="1px"
    >
      <Box
      pb={3}
      px={3}
      fontSize={{base:"17px",md:"15px",lg:"19px"}}
      display="flex"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      >
        MyChats
        <GroupChat>
        <Button  rightIcon={<AddIcon/>} display="flex" fontSize={{base:"17px",md:"15px",lg:"19px"}}>New Group Chat</Button>
        </GroupChat>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) =>  ( 
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                display={"flex"}
                mb={2}
                w="100%"
                h="100%"
                alignItems={"center"}
              >
                <Avatar
                mr={5}
                size="sm"
                cursor="pointer"
                name={getSender(currentUser, chat.users)}
                // src={getProile(currentUser,chat.users)}
              />
              <Box>
                <Text>
                  {!chat.isGroupChat
                    ? getSender(currentUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender} : </b>
                    {chat.latestMessage.Content.length > 50
                      ? chat.latestMessage.Content.substring(0, 51) + "..."
                      : chat.latestMessage.Content}
                  </Text>
                )}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}

      </Box>
    </Box>
  );
}

export default MyChats;
