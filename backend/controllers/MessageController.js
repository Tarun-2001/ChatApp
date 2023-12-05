const Message = require("../Models/MessageModel");
const User = require("../Models/UserModel");
const Chat = require("../Models/ChatModel");

const sendMessage = async (req, res) => {
  // console.log(req.user)
  const { ChatId, Content } = req.body;
  if (!Chat || !Content) {
    res.status(400).json({ message: "Please fill all details" });
  }
  const msgObj = {
    Content: Content,
    ChatId: ChatId,
    Sender: req.user.id,
  };
  try {
    var message = await Message.create(msgObj);
    message = await message.populate("Sender", "name pic");
    message = await message.populate("ChatId");
    message = await User.populate(message, {
      path: "ChatId.users",
      select: "name email pic",
    });
    message = await User.populate(message, {
        path: "ChatId.latestMessage"
      });
     await Chat.findByIdAndUpdate(ChatId, {
        latestMessage: message,
      });
   

    res.status(200).json({ message });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const allMessages = async (req,res)=>{
  try{
    var messages = await Message.find({ChatId:req.params.chatId}).populate("ChatId")
    messages = await User.populate(messages,{
      path:"ChatId.users",
      select:"email name pic"
    })
    res.status(200).json(messages)
  }
  catch(error){
    res.status(400)
    
  }
}

module.exports = { sendMessage,allMessages };
