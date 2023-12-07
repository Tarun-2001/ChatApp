import { Box, Text} from '@chakra-ui/layout';
import React,{useState,useContext} from 'react';
import chatContext from "../Context/Chat/ChatContext";
import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList, Tooltip } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import ProfileModal from './ProfileModal';

const SideDrawer = () => {
    const [search,setSearch] = useState("")
  const [loading ,setLoading] = useState(false)
  const [loadChat,setLoadChat] = useState()
  const [searchResult,setSearchResult] = useState([])

  const context = useContext(chatContext);
  const { user } = context;

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
            <Button variant="ghost">
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
                name="tarun"
                src=""
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
    </>
  );
}

export default SideDrawer;
