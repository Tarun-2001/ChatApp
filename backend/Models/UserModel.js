const mongoose = require('mongoose');
const {Schema} = mongoose

const userModel = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:
            "https://srcwap.com/wp-content/uploads/2022/08/abstract-user-flat-4.png"
    }
},{
    timestamps:true
})

const User = mongoose.model("User",userModel)
module.exports = User

//name, email, pass, pic