export const getSender = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  };

  export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };

  export const getProile = (loggedUser, users)=>{
    return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
  }