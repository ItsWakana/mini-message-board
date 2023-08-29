const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    messageContent: {
        type: String,
        required: true
    },
    sentAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
    },
    author: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("messages", MessageSchema);