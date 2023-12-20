const express = require('express')
const dotenv = require('dotenv')
const data = require('./config/data')
const connectToDataBase = require('./databaseConnection')
const user = require('./routes/user')
const chat = require('./routes/chat')
const message = require('./routes/message')
const app = express()  
const {notFound,errorHandle} = require('./middleware/erroeHandle')
app.use(express.json()); // to accept json data
dotenv.config()
connectToDataBase()
var cors = require('cors')
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Welcome to home page")
})
app.use('/api/user',user)
app.use('/api/chat',chat)
app.use('/api/message',message)
app.use(notFound);
app.use(errorHandle)
const PORT = process.env.PORT || 5000
const server= app.listen(PORT,console.log(`Server is running ${PORT}`))

const io= require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:'http://localhost:3000'
    }
})

io.on("connection",(socket)=>{
    console.log("Connected to socket.io")
    socket.on("setUp",(data)=>{
        socket.join(data._id)
        socket.emit("connected")
    })
    socket.on('join chat',(room)=>{
        socket.join(room)
        console.log('user joined room'+room)
    })
    socket.on('new message',(newmsg)=>{
        var chat = newmsg
        if(!chat) return console.log("chat.users is not defined")
        chat.ChatId.users.forEach(user => {
            if(user._id==newmsg.Sender._id) return
            socket.in(user._id).emit('message recieved',newmsg)
        });
    })
})