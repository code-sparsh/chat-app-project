const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const MessageSchema = new Schema({

    message:{
        type: String,
        required: true
    },

    senderID: {
        type: String,
        required: true
    },

    receiverID: {
        type: String, 
        required: true
    },

    conversationID: {
        type: String,
        required: true
    }
},{timestamps:true})


const Message = mongoose.model("message", MessageSchema)


module.exports = Message;