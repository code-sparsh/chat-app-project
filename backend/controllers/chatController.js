const Message = require("../models/MessageModel")


const createMessage = async ({ message, senderID, receiverID, conversationID }) => {

    try {
        Message.create({ message, senderID, receiverID, conversationID })
    }
    catch (error) {
        throw error;
    }

}

// get all messages in a conversation

const getMessages = async (req, res) => {

    const { conversationID } = req.body;

    try {

        const messages = await Message.find({ conversationID })
        res.status(200).json(messages)
    }

    catch (error) {
        res.status(400).json({ error: error })
    }
}

module.exports = { createMessage, getMessages }