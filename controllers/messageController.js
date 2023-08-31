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

const writeMessageToDb = () => {}

module.exports = {
    getMessageById,
    getAllMessages
}