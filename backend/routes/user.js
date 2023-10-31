const express = require('express');
const router = express.Router();
const {createUser,loginUser,allUsers} = require('../controllers/UserController');
const fetchuser = require('../middleware/fetchuser')
const {createUserValdiation,loginUserValidation} = require('../Express-Validations/UserValidation')


router.post('/',createUserValdiation,createUser);
router.post('/login', loginUserValidation,fetchuser,loginUser); 
router.get('/',fetchuser,allUsers)

module.exports = router;
