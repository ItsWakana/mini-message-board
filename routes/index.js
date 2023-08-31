var express = require('express');
var router = express.Router();
const Message = require("../models/message");
const { getAllMessages } = require("../controllers/messageController");

/* GET home page. */
router.get('/', getAllMessages);

router.get('/new', (req, res, next) => {
  res.render('form');
});

router.post('/new', async (req, res) => {
  const { author, message } = req.body;

  try {
    const myMessage = await Message.create({
      messageContent: message,
      sentAt: new Date(),
      author: author
    });

    // const newMessagesFromDb = await Message.find({});

    // res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the message' });
  }

  res.redirect('/');

})

module.exports = router;
