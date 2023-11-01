const { async } = require("rxjs");
const Chat = require("../Models/ChatModel");
const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400).json({ error: "Please provide userId" });
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    const chatData = {
      isGroupChat: false,
      users: [req.user.id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const chat = await Chat.find(createdChat)
        .populate("users", "-password")
        .populate("latestMessage");
      res.status(200).json(chat);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
};

const fetchChats = async (req, res) => {
  try{
    const allChats = await Chat.find({
        users: { $elemMatch: { $eq: req.user.id } },
      })
        .populate("users", "-password")
        .populate("latestMessage");
      res.status(200).send(allChats);
  }
  catch(error){
    res.status(400).json({"error":error.message})
  }
};
module.exports = { accessChat, fetchChats };
