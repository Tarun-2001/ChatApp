import React, { useContext, useState } from "react";
import chatContext from "../Context/Chat/ChatContext";
import SideDrawer from "../MixedComponents/SideDrawer";
import { Box } from "@chakra-ui/layout";
import ChatBox from "../Components/ChatBox";
import MyChats from "../Components/MyChats";
const ChatPage = () => {

    const context = useContext(chatContext);
  const { user } = context;
  return (
    <div>
        {user&&<SideDrawer/>}
        <Box display="flex" w="100%" justifyContent="space-between" h="91.5vh" p="10px">
            {user&&<ChatBox/>}
            {user&&<MyChats/>}
        </Box>
    </div>
  );
}

export default ChatPage;
