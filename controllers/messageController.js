const Message = require('../models/message');
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

// const getMessageById = async (req, res, next) => {
//     try {
//         const foundMessage = await Message.findById(req.params.messageId).exec();
//         res.render('singleMessage', { message: foundMessage });
//       } catch(err) {
//         res.send("No message found with this id");
//       }
// }

const getMessageById = asyncHandler( async (req, res, next) => {
    //check length of params first before making the request to db.
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

// const getAllMessages = async (req, res, next) => {
//     try {
//         const messages = await Message.find({});
//         res.render('index', { title: 'Mini Message Board', messages: messages });
//       } catch (err) {
//         console.log(err);
//         return next(err);
//       }
// }

const getAllMessages = asyncHandler( async (req, res, next) => {
    const messages = await Message.find({});
    res.render('index', { title: 'Mini Message Board', messages: messages});
})

// const writeMessageToDb = async (req, res, next) => {

//     const { author, message } = req.body;

//     try {
//       const myMessage = await Message.create({
//         messageContent: message,
//         sentAt: new Date(),
//         author: author
//       });
//     } catch (error) {
//       res.status(500).json({ error: 'An error occurred while saving the message' });
//     }
  
//     res.redirect('/');
// }

const writeMessageToDb = asyncHandler( async (req, res, next) => {

    const { author, message } = req.body;

    await Message.create({
        messageContent: message,
        sentAt: new Date(),
        author: author
    });

    res.redirect('/');
})

module.exports = {
    getMessageById,
    getAllMessages,
    writeMessageToDb
}