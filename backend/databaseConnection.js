const mongoose = require('mongoose')

const connectToDataBase = async ()=>{
    try{
        await mongoose.connect(process.env.MONGOURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongoodb connected successfully");
    }
    catch(error){ 
        console.log("Error while connecting database");
    }
}
module.exports=connectToDataBase;
