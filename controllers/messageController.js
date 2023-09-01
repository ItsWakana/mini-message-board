const Message = require('../models/message');
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const getMessageById = asyncHandler( async (req, res, next) => {

    if (!mongoose.isValidObjectId(req.params.messageId)) {
        const err = new Error("Invalid message id");
        return next(err);
    }
    const foundMessage = await Message.findById(req.params.messageId).exec();

    if (foundMessage === null) {
        const err = new Error('Message not found with the specified id');
        err.status = 404;
        return next(err);
    }

    res.render('singleMessage', { message: foundMessage });
});

const getAllMessages = asyncHandler( async (req, res, next) => {
    const messages = await Message.find({});
    res.render('index', { title: 'Mini Message Board', messages: messages});
})

const writeMessageToDb = asyncHandler( async (req, res, next) => {

    const { author, message } = req.body;

    await Message.create({
        messageContent: message,
        sentAt: new Date(),
        author: author
    });

    res.redirect('/');
})

const getDeleteMessage = asyncHandler( async (req, res, next) => {
    const id = req.params.messageId;

    if (!mongoose.isValidObjectId(id)) {
        const err = new Error("Invalid message id");
        return next(err);
    }

    const foundMessage = await Message.findById(id);

    if (!foundMessage) {
        res.redirect('/messages');
    }
    res.render('deleteMessage', { title: 'Delete Message', message: foundMessage });
});

const postDeleteMessage = asyncHandler( async(req, res, next) => {

    const id = req.body["message-id"];
    await Message.deleteOne({ _id: id});

    res.redirect('/messages');
});

module.exports = {
    getMessageById,
    getAllMessages,
    writeMessageToDb,
    getDeleteMessage,
    postDeleteMessage
}