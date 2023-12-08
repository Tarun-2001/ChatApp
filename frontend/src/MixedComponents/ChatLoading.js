import React from "react";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { Stack } from "@chakra-ui/react";
const ChatLoading = () => {
  return (
    <div>
      <Stack>
        <Skeleton height="35px" />
        <Skeleton height="35px" />
        <Skeleton height="35px" />
        <Skeleton height="35px" />
        <Skeleton height="35px" />
        <Skeleton height="35px" />
        <Skeleton height="35px" />
        <Skeleton height="35px" />
        <Skeleton height="35px" />
      </Stack>
    </div>
  );
};

export default ChatLoading;