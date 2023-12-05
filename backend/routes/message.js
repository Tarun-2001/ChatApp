const express = require('express')
const router = express.Router()
const protect = require('../middleware/protect')
const {sendMessage,allMessages} = require('../controllers/MessageController')


router.post('/',protect,sendMessage)
router.get('/:chatId',protect,allMessages)

module.exports = router