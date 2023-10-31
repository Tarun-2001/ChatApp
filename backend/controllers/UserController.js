const User = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");
const generateToke = require("../config/tokengeneration");
const bcypt = require("bcrypt");
const { validationResult } = require("express-validator"); //Importing validator dependencies

const createUser = async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    let success = false;
    return res.status(400).json({ err: err.array() });
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Enter valid details" });
  }

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  const salt = await bcypt.genSalt(10);
  const encryptPassword = await bcypt.hash(password, salt);
  const user = new User({
    name: name,
    email: email,
    password: encryptPassword,
  });

  if (user) {
    await user.save();
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: generateToke(user._id),
    });
  } else {
    return res
      .status(400)
      .json({ error: "Unable to create user, please try again!!!" });
  }
};
const loginUser = async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    let success = false;
    return res.status(400).json({ err: err.array() });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Enter Required details" });
  }
  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    return res.status(400).json({ error: "User do not exists" });
  }
  const verifyPassowrd = await bcypt.compare(password, checkUser.password);
  if (verifyPassowrd) {
    return res.status(201).json({
      message: "Login successfully",
      token:generateToke(checkUser._id),
    });
  } else {
    return res.status(400).json({ error: "Enter valid details!!!" });
  }
};
const allUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await (User.find(keyword).find({_id:{$ne:req.user.id}}));
    res.status(200).json(users);
  } catch (error) {
    res.status(400)
    new Error(error.message);
  }
};
module.exports = { createUser, loginUser, allUsers };
