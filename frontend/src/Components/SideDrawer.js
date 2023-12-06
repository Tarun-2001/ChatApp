import React, { useState } from 'react';
import Model from './Model';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Input,
  Button,  
  useToast,
  Toast
} from '@chakra-ui/react'
import {useDisclosure} from '@chakra-ui/hooks';
import ChatLoading from './ChatLoading';
import UserList from './UserList';
const SideDrawer = () => {

  const [search,setSearch] = useState("")
  const [loading ,setLoading] = useState(false)
  const [loadChat,setLoadChat] = useState()
  const [searchResult,setSearchResult] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const btnRef = React.useRef()
  const handleSearch = async ()=>{
    if(!search){
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
        const data = await fetch(`http://localhost:5000/api/user?search=${search}`,{
          method: "GET",
          headers: {
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmYwNzU0ZTQ4MDNlYjg5ZmRmMjIwNiIsImlhdCI6MTcwMTc3NTE4OX0.0KqyFaJId7hKIDAT2gZacTQwJ1NE_8VpKXqUN31aL3w"
          }
          })
          // console.log(data.ok)
        setLoading(false)
        const response = await data.json()
        setSearchResult(response)
        // console.log(searchResult)
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
  const accessChat = (a)=>{}

  return (
    <div>
      <div style={{padding:"5px 10px 5px 10px" , display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"ash",width:"100%",borderWidth:"10px"}}>

      <button type="button" className="btn btn-success" onClick={onOpen}>
      <i className="bi bi-search" style={{padding:"3px"}}></i>
        Success
      </button>

      <h4>Interact Your Self</h4>

      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="bi bi-list"></i>
        </button>
        <ul className="dropdown-menu">
          <li><button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Profile</button></li>
          <li><button className="dropdown-item" type="button">Logout</button></li>
        </ul>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">Guest User</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-center">
          <div className="d-flex flex-column align-items-center">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqTtLJRkh4PRn_faAgBJxMfZRWQGLhm8l0Y4lxNaCCeA&s" alt="User Name" style={{ width: "150px", borderRadius: "50%" }} />
          <h4 className="mt-2">User Email</h4>
        </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
      </div>
      </div>
      <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px"> Search User
        </DrawerHeader>
        <DrawerBody>
        <Box d="flex" pb={2}>
          <Input placeholder='Search name or Email' mr={2} value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
        </Box>
        {loading?<ChatLoading/>:(
          searchResult?.map((res)=>{
            return <UserList key={res._id} user={res} handleFunction = {()=>{accessChat(res._id)}}/>
          })
        )}
      </DrawerBody>
      <DrawerFooter>
      <Button variant='outline' mr={3} onClick={handleSearch}>  
              Search
            </Button>
      </DrawerFooter>
      </DrawerContent>
      </Drawer>
      </div>
      
    </div>
  );
}

export default SideDrawer;
