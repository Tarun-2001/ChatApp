const { async } = require("rxjs");
const Chat = require("../Models/ChatModel");
const User = require("../Models/UserModel");
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
    isChat = await User.populate(isChat,{
      path:"latestMessage.sender",
      select:"name email pic"
    })
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    const chatData = {
      isGroupChat: false,
      users: [req.user.id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      var chat = await Chat.findOne(createdChat)
        .populate("users", "-password")
      res.status(200).json(chat);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
};

const fetchChats = async (req, res) => {
  try {
    var allChats = await Chat.find({
      users: { $elemMatch: { $eq: req.user.id } },
    })
      .populate("users", "-password")
      .populate("latestMessage");

      allChats = await User.populate(allChats,{
        path:"latestMessage.sender",
        select:"name email pic"
      })

    res.status(200).send(allChats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createGroupChats = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    res.status(400).json({ message: "Please fill all details" });
  }
  var { name, users } = req.body;
  users = JSON.parse(users);
  if (users.length <= 2) {
    res
      .status(404)
      .json({ message: "To create more than 2 users are required" });
  }
  users.push(req.user.id);
  const groupChat = await Chat.create({
    chatName: name,
    isGroupChat: true,
    users: users,
    groupAdmin: req.user.id,
  });
  const fullGroupChat = await Chat.find(groupChat)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  res
    .status(200)
    .json({ Message: "Successfully group created", fullGroupChat });
};

const renameGroup = async (req, res) => {
  if (!req.body.chatName) {
    res.status(400).json({ message: "Please fill the below fields" });
  }
  const { chatId, chatName } = req.body;
  const updateChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updateChat) {
    return res.status(404).send({ message: "No chat found" });
  } else {
    res.status(200).send(updateChat);
  }
};

const addUserToGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const addUser = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!addUser) {
    return res.status(404).send({ message: "No chat found" });
  } else {
    res.status(200).send(addUser);
  }
};

const removeUserFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const removeUser = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!removeUser) {
    return res.status(404).send({ message: "No chat found" });
  } else {
    res.status(200).send(removeUser);
  }
};
module.exports = {
  accessChat,
  fetchChats,
  createGroupChats,
  renameGroup,
  addUserToGroup,
  removeUserFromGroup,
};
