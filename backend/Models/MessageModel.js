const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageModel = new Schema(
  {
    Sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Content: {
      type: String,
      trim: true,
    },
    Chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);
const Message = mongoose.model("Message",messageModel);
module.exports = Message