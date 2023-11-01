const jwt = require('jsonwebtoken')
const protect= (req,res,next) =>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Please provide valid auth-token"})
    }
    try{
        const data = jwt.verify(token,process.env.JWTSECREATKEY) //validating the token provided by user
        req.user = data;
        next()
    }catch(Error){
        res.status(401).send({error:"Please please provide valid auth-token"})
    }
}

module.exports = protect;