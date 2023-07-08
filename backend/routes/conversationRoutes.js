const express = require("express")

const router = express.Router()

const {getConversations, startConversation} = require("../controllers/conversationController")
const {getMessages} = require("../controllers/chatController")


// get all the active conversations of a user
router.post("/",getConversations)


// start a new conversation

router.post("/start", startConversation)


router.post("/messages", getMessages)

module.exports = router