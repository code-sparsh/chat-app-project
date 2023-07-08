
const Conversation = require('../models/ConversationModel')


// get all the active conversations of a user
const getConversations = async (req,res) => {

    const {userID} = req.body;

    try{
        
        const conversations = await Conversation.find({$or:[{receiverID: userID}, {senderID: userID}]})
        res.status(200).json(conversations)
    }
    catch(error) {
        res.status(400).json({error: error})
    }

}

// start a new conversation
const startConversation = async (req,res) => {

    const {senderID, recieverID} = req.body;

    try{
        
        const conversation = await Conversation.create({senderID, recieverID})

        res.status(200).json(conversation)
    }
    catch(error) {
        res.status(400).json({error: error})
    }
}




module.exports = {getConversations, startConversation,}