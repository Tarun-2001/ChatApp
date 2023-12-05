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
app.listen(PORT,console.log(`Server is running ${PORT}`))