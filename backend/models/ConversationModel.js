const mongoose = require("mongoose")


const Schema = mongoose.Schema;

const ConversationSchema = new Schema({

    senderID: {
        type: String,
        required: true
    },

    receiverID: {
        type: String,
        required: true
    },
},{timestamps : true})

const Conversation = mongoose.model('Conversation',ConversationSchema)


module.exports = Conversation