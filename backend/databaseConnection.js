const mongoose = require('mongoose')

const mongooseUrl = `mongodb+srv://kiran:database@cluster0.np63w4z.mongodb.net/`;

const connectToDataBase = async ()=>{
    try{
        await mongoose.connect(mongooseUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongoodb connected successfully");

    }
    catch(error){
        console.log("Error while connecting database");
    }
}
module.exports=connectToDataBase;
