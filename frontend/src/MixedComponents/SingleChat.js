import React, { useContext } from 'react';
import chatContext from '../Context/Chat/ChatContext';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../Components/Config/Logic';
import ProfileModal from './ProfileModal';
import GroupChatUpdate from './GroupChatUpdate';

const SingleChat = () => {
    const context = useContext(chatContext)
    const {user,selectedChat,setSelectedChat,fetctAgain,setFetchAgain} = context
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
                <GroupChatUpdate></GroupChatUpdate>
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
            overflowY="hidden"></Box>
        </>):<Box display={"flex"} alignItems={"center"} justifyContent={"center"} h={"100%"}>
        <Text fontSize = "3xl" pb={3} > Select chat to start chating!!!</Text>
       </Box>
       }
    </>
  );
}

export default SingleChat;
