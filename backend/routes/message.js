const express = require('express')
const router = express.Router()
const protect = require('../middleware/protect')
const {sendMessage} = require('../controllers/MessageController')


router.post('/',protect,sendMessage)

module.exports = router