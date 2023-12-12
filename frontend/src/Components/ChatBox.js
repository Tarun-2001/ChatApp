import { Box } from '@chakra-ui/react';
import React, { useContext } from 'react';
import chatContext from '../Context/Chat/ChatContext';
import SingleChat from '../MixedComponents/SingleChat';

const ChatBox = () => {
  const context = useContext(chatContext)
  const {selectedChat} = context
  return (
    <Box
    display={{base:selectedChat?"flex":"none",md:"flex"}}
    alignItems={"center"}
    flexDir={"column"}
    p={3}
    bg={"white"}
    w={{base:"100%",md:"68%"}}
    borderRadius={"lg"}
    borderWidth={"1px"}
    >
      <SingleChat/>
    </Box>
  );
}

export default ChatBox;
