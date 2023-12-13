const express = require('express');
const router = express.Router();
const {createUser,loginUser,allUsers} = require('../controllers/UserController');
const protect = require('../middleware/protect')
const {createUserValdiation,loginUserValidation} = require('../Validations/UserValidation')


router.post('/',createUserValdiation,createUser);
router.post('/login', loginUserValidation,loginUser); 
router.get('/',protect,allUsers)

module.exports = router;
