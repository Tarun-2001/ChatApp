import {  Box, Button, FormControl, IconButton, Input, Spinner, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { ViewIcon } from "@chakra-ui/icons";
import chatContext from "../Context/Chat/ChatContext";
import UserBadge from "../Components/User/UserBadge";
import UserList from "../Components/User/UserList";

const GroupChatUpdate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(chatContext)
  const {user,selectedChat,setSelectedChat,fetchAgain,setFetchAgain} = context
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();

  const handleRename = async ()=>{
    if(!groupChatName) return 
    try{
        setRenameLoading(true)
        const data = await fetch('http://localhost:5000/api/chat/renamegroup',{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmYwNzU0ZTQ4MDNlYjg5ZmRmMjIwNiIsImlhdCI6MTcwMTc3NTE4OX0.0KqyFaJId7hKIDAT2gZacTQwJ1NE_8VpKXqUN31aL3w"
            },
            body: JSON.stringify({
                chatId:selectedChat._id,
                chatName:groupChatName
              }),
        })
        console.log(data)
        const res = await data.json()
        setSelectedChat(res)
        setFetchAgain(!fetchAgain)
        setRenameLoading(false)

    }catch(error){
        toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
    }
  }
  const handleSearch = async (query)=>{
    if(!query){
      toast({
        title:"Please enter something to search",
        status: "warning",
        duration: 2000,
        isClosable:true,
        position:'top-left'
      })
    }
    else{
      try{
        setLoading(true)
        const data = await fetch(`http://localhost:5000/api/user?search=${query}`,{
          method: "GET",
          headers: {
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmYwNzU0ZTQ4MDNlYjg5ZmRmMjIwNiIsImlhdCI6MTcwMTc3NTE4OX0.0KqyFaJId7hKIDAT2gZacTQwJ1NE_8VpKXqUN31aL3w"
          }
          })
        setLoading(false)
        const response = await data.json()
        setSearchResult(response)
      }
      catch(error){
        toast({
          title:"Failed to load search data",
          status: "warning",
          duration: 2000,
          isClosable:true,
          position:'top-left'
        })
      }
    }
  }
  const handleRemove = async (rmUsr)=>{
    if (selectedChat.groupAdmin._id !== user._id && rmUsr._id !== user._id) {
        toast({
          title: "Only admins can remove someone!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      try{
        setLoading(true)
        const data = await fetch('http://localhost:5000/api/chat/groupremove',{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmYwNzU0ZTQ4MDNlYjg5ZmRmMjIwNiIsImlhdCI6MTcwMTc3NTE4OX0.0KqyFaJId7hKIDAT2gZacTQwJ1NE_8VpKXqUN31aL3w"
            },
            body: JSON.stringify({
                chatId:selectedChat._id,
                userId:rmUsr._id
              }),
        })  
        const resp = await data.json()
        if(rmUsr._id===user._id) setSelectedChat()
        else setSelectedChat(resp)
        setFetchAgain(!fetchAgain);
        setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  }
  const handleAddUser = async (addUser)=>{
    const exist = selectedChat.users.find((ele)=>{return ele._id===addUser._id})
    if(exist){
        toast({
            title:"Person already exist ",
            status: "warning",
            duration: 2000,
            isClosable:true,
            position:'top-left'
          })
          return
    }
    if (selectedChat.groupAdmin._id !== user._id) {
        toast({
          title: "Only admins can add someone!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      try{
        setLoading(true)
        const data = await fetch('http://localhost:5000/api/chat/groupadd',{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmYwNzU0ZTQ4MDNlYjg5ZmRmMjIwNiIsImlhdCI6MTcwMTc3NTE4OX0.0KqyFaJId7hKIDAT2gZacTQwJ1NE_8VpKXqUN31aL3w"
            },
            body: JSON.stringify({
                chatId:selectedChat._id,
                userId:addUser._id
              }),
        })  
        const res = await data.json()
        setSelectedChat(res)
        setFetchAgain(!fetchAgain)
        setLoading(false)
      }catch(error){
        toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
      }
  }
  return (
    <>
      <IconButton display={{base:"flex"}} onClick={onOpen} icon={<ViewIcon/> }/>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
           fontSize="35px"
           fontFamily="Work sans"
           display="flex"
           justifyContent="center"
           >{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} flexWrap={"wrap"} pb={3} w={"100%"}>
            {selectedChat.users.map((usr)=>{
                return <UserBadge key={usr._id} user ={usr} handleFunction = {()=>{handleRemove(usr)}}></UserBadge>
            })}
            </Box>
            <FormControl display={"flex"}>
                <Input
                placeholder="Group Name"
                mb={3}
                value={groupChatName}
                onChange={(e)=>{setGroupChatName(e.target.value)}}
                />
                <Button
                 variant="solid"
                 colorScheme="teal"
                 ml={1}
                 isLoading={renameloading}
                 onClick={handleRename}>Update</Button>
            </FormControl>
            <FormControl>
                <Input placeholder="Add Users" mb={3} onChange={(e)=>{handleSearch(e.target.value)}}></Input>
            </FormControl>
            {loading?(
              <Spinner size="lg" />
            ) :searchResult.slice(0,4).map((ele)=>{
               return  <UserList key = {ele._id} user = {ele} handleFunction = {()=>{handleAddUser(ele)}}></UserList>
            })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={()=>{handleRemove(user)}}>Leave Group</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatUpdate;
