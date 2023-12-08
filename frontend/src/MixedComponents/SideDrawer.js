import { Box, Text} from '@chakra-ui/layout';
import React,{useState,useContext} from 'react';
import chatContext from "../Context/Chat/ChatContext";
import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList, Tooltip, Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, 
  useDisclosure,
  Input,
  useToast} from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import ProfileModal from './ProfileModal';
import ChatLoading from './ChatLoading';
import UserList from '../Components/User/UserList';

const SideDrawer = () => {
    const [search,setSearch] = useState("")
  const [loading ,setLoading] = useState(false)
  const [loadChat,setLoadChat] = useState()
  const [searchResult,setSearchResult] = useState([])

  const context = useContext(chatContext);
  const { user,setSelectedChat ,chats,setChats } = context;
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
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
  const accessChat = async (id)=>{
    try{
      setLoading(true)
        const data = await fetch(`http://localhost:5000/api/chat`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmYwNzU0ZTQ4MDNlYjg5ZmRmMjIwNiIsImlhdCI6MTcwMTc3NTE4OX0.0KqyFaJId7hKIDAT2gZacTQwJ1NE_8VpKXqUN31aL3w"
          },
          body: JSON.stringify({
            userId:id
          }),
          })
        setLoading(false)
        const response = await data.json()
        if(!chats.find((ele)=>{return ele._id===response._id})) setChats([response, ...chats])
        setSelectedChat(response)
        onClose()

    }catch(err){
      toast({
        title:"Failed to load search data",
        status: "warning",
        duration: 2000,
        isClosable:true,
        position:'top-left'
      })
    }
  }


  return (
    <>
      <Box
       display="flex"
       justifyContent="space-between"
       alignItems="center"
       bg="white"
       w="100%"
       p="5px 10px 5px 10px"
       borderWidth="5px"
       >
        <Tooltip label="Search Users" hasArrow placement = "bottom-end">
            <Button variant="ghost" onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text display={{base:"none", md:"flex"}} px={"4px"}> Search User</Text>
            </Button>
        </Tooltip>
        <Text fontSize={"2xl"}>Interact As You Want</Text>
        <div>
        <Menu>
            <MenuButton>
            <BellIcon fontSize="2xl"></BellIcon>
            </MenuButton>
            {/* <MenuList></MenuList> */}
        </Menu>
        <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
            <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.src}
              />
            </MenuButton>
            <MenuList>
                <ProfileModal user = {user}>
                <MenuItem>My Profile</MenuItem>
                </ProfileModal>
                <MenuItem>Logout</MenuItem>
            </MenuList>
        </Menu>
        </div>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderWidth="1px">Search User</DrawerHeader>

          <DrawerBody>
            <Box display="flex" pb={2}>
            <Input placeholder='Type here...' mr={2} value={search} onChange={(e)=>{setSearch(e.target.value)}} />
            <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading?<ChatLoading/>:(
              searchResult.map((res)=>{
                return <UserList user = {res} key = {res._id} handleFunction = {()=>{accessChat(res._id)}}/>
              })
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
