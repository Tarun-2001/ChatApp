import React, { useContext } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../Components/Config/Logic";
import chatContext from "../Context/Chat/ChatContext";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrollChat = (props) => {
  const { messages } = props;
  const context = useContext(chatContext);
  const { user } = context;
  return (
    <ScrollableFeed>
        {messages?.map((ele, i) => {
          return (
            <div style={{ display: "flex" }} key={ele._id}>
              {(isSameSender(messages, ele, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={ele.Sender.name}
                    src={ele.Sender.pic}
                  />
                </Tooltip>
              )}

              <span
                style={{
                  backgroundColor: `${
                    ele.Sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft: isSameSenderMargin(messages, ele, i, user._id),
                marginTop: isSameUser(messages, ele, i, user._id) ? 3 : 10,
                }}
                
              >
                {ele.Content}
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollChat;
