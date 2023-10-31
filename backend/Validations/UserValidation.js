const { body } = require('express-validator'); //Importing validator dependencies
const createUserValdiation = [
    body('name','Enter valid name ').isLength({min:3}),
    body('email','Enter valid email').isEmail(),
    body('password','Password must be minimum 5 characters').isLength({min:5})
]
const loginUserValidation = [
    body('email','Enter valid email').isEmail(),
    body('password','Password should not be blank').exists({min:5})
]
module.exports = {createUserValdiation,loginUserValidation}