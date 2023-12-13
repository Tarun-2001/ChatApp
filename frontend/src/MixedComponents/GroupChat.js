import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";
import chatContext from "../Context/Chat/ChatContext";
import UserList from "../Components/User/UserList";
import UserBadge from "../Components/User/UserBadge";

const GroupChat = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupName,setGroupName] = useState();
  const [selectedUsers,setSelectedUsers] = useState([])
  const [search,setSearch] = useState("")
  const [searchResult,setSearchResult] = useState([])
  const [loading,setLoading] = useState()
  const toast = useToast()
  const context = useContext(chatContext)
  const {user,chats,setChats} =context

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
            "auth-token": user.token
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
  const handleGroup = (addUser)=>{
    const exist = selectedUsers.find((ele)=>{return ele._id===addUser._id})
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
    setSelectedUsers([...selectedUsers,addUser])
  }
  const handleSubmit = async ()=>{
    if(!groupName||!selectedUsers){
        toast({
            title:"Fill required fields",
            status: "warning",
            duration: 2000,
            isClosable:true,
            position:'top-left'
          })
          return
    }
    try{
          
          const data = await fetch(`http://localhost:5000/api/chat/group`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": user.token
            },
            body: JSON.stringify({
              name:groupName,
              users:JSON.stringify(selectedUsers.map((ele)=>{return ele._id}))
            }),
            })
          const response = await data.json()
          setChats([response,...chats])
          onClose()
  
      }catch(err){
        toast({
          title:"Failed to create group chat",
          status: "warning",
          duration: 2000,
          isClosable:true,
          position:'top-left'
        })
      }
  }

  const handleDelete = (delUsr)=>{
    setSelectedUsers(selectedUsers.filter((ele)=>{
        return ele._id!==delUsr._id
    })
    )
  }

  return (
    <div>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          display="flex"
          justifyContent="center"
          >
            Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display={"flex"}
          alignItems={"center"}
          flexDir={"column"}
          >
            <FormControl>
                <Input placeholder="Chat Name" mb={3} onChange={(e)=>{setGroupName(e.target.value)}}></Input>
            </FormControl>
            <FormControl>
                <Input placeholder="Add Users" mb={3} onChange={(e)=>{handleSearch(e.target.value)}}></Input>
            </FormControl>
            <Box display={"flex"} flexWrap={"wrap"}>
            {selectedUsers.map((usr)=>{
                return <UserBadge key={usr._id} user ={usr} handleFunction = {()=>{handleDelete(usr)}}></UserBadge>
            })}
            </Box>
            {loading?<div>Loading</div>:searchResult.slice(0,4).map((ele)=>{
               return  <UserList key = {ele._id} user = {ele} handleFunction = {()=>{handleGroup(ele)}}></UserList>
            })}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue"  onClick={handleSubmit}>
              Create Group
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GroupChat;
