const Message = require('../models/message');

const getMessageById = async (req, res, next) => {
    try {
        const foundMessage = await Message.findById(req.params.messageId).exec();
        res.render('singleMessage', { message: foundMessage });
      } catch(err) {
        res.send("No message found with this id");
      }
}

const getAllMessages = async (req, res, next) => {
    try {
        const messages = await Message.find({});
        res.render('index', { title: 'Mini Message Board', messages: messages });
      } catch (err) {
        console.log(err);
        return next(err);
      }
}

const writeMessageToDb = async (req, res, next) => {

    const { author, message } = req.body;

    try {
      const myMessage = await Message.create({
        messageContent: message,
        sentAt: new Date(),
        author: author
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving the message' });
    }
  
    res.redirect('/');
}

module.exports = {
    getMessageById,
    getAllMessages,
    writeMessageToDb
}