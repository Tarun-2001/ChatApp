import { CloseIcon } from '@chakra-ui/icons';
import { Badge, Box } from '@chakra-ui/react';
import React from 'react';

const UserBadge = (props) => {
    const {user,handleFunction} = props
  return (
    <Badge 
    px={2}
    py={1}
    borderRadius="lg"
    m={1}
    mb={2}
    fontSize={12}
    backgroundColor={"purple"}
    color={"white"}
    cursor={"pointer"}
    onClick={handleFunction}
    >
    {user.name}
    <CloseIcon pl={1}/>
    </Badge>
  );
}

export default UserBadge;
