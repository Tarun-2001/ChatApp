export const getSender = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  };

  export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };

  export const getProile = (loggedUser, users)=>{
    return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
  }
  export const isSameSenderMargin = (messages, m, i, userId) => {  
    if (
      i < messages.length - 1 &&
      messages[i + 1].Sender._id === m.Sender._id &&
      messages[i].Sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].Sender._id !== m.Sender._id &&
        messages[i].Sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].Sender._id !== userId)
    )
      return 0;
    else return "auto";
  };
  
  export const isSameSender = (messages, m, i, userId) => {
    return (
      i <  messages.length - 1 &&
      (messages[i + 1].Sender._id !== m.Sender._id ||
        messages[i + 1].Sender._id === undefined) &&
      messages[i].Sender._id !== userId
    );
  };
  
  export const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].Sender._id !== userId &&
      messages[messages.length - 1].Sender._id
    );
  };
  
  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].Sender._id === m.Sender._id;
  };
  