const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect')
const {accessChat,fetchChats,createGroupChats,renameGroup,addUserToGroup,removeUserFromGroup} = require('../controllers/ChatController')


router.post('/',protect,accessChat);
router.get('/', protect,fetchChats); 
router.post('/group',protect,createGroupChats)
router.put('/renamegroup',protect,renameGroup)
router.put('/groupadd',protect,addUserToGroup)
router.put('/groupremove',protect,removeUserFromGroup)




module.exports = router;
