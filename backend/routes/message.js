const express = require('express')
const router = express.Router()
const protect = require('../middleware/protect')
const {sendMessage,allMessages,deleteMessage} = require('../controllers/MessageController')


router.post('/',protect,sendMessage)
router.get('/:chatId',protect,allMessages)
router.delete('/delete',deleteMessage)

module.exports = router