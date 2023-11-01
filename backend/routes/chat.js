const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect')
const {accessChat,fetchChats} = require('../controllers/ChatController')


router.post('/',protect,accessChat);
router.get('/', protect,fetchChats); 
// router.post('/group',protect,createGroupChats)
// router.put('/renamegroup',protect,renameGroup)
// router.put('/groupremove',protect,removeFromGroup)
// router.put('/groupadd',protect,addToGroup)




module.exports = router;
