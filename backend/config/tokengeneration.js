const jwttoken = require('jsonwebtoken')
// const secretKey = require(')

const generateToke = (id)=>{
    return jwttoken.sign({id},process.env.JWTSECREATKEY);
}

module.exports = generateToke;