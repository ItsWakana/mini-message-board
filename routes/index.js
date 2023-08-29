var express = require('express');
var router = express.Router();
const Message = require("../models/message");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Mini Message Board', messages: messages });
});

router.get('/new', (req, res, next) => {
  res.render('form');
});

router.post('/new', async (req, res) => {
  const { author, message } = req.body;

  try {
    const myMessage = new Message({
      messageContent: message,
      sentAt: new Date(),
      author: author
    });

    await myMessage.save();

    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the message' });
  }

  messages.push({text: message, user: author, added: new Date()});
  res.redirect('/');

})

module.exports = router;
