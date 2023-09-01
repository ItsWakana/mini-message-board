const express = require('express');
const router = express.Router();
const {
  getMessageById, 
  getAllMessages,
  writeMessageToDb,
  getDeleteMessage,
  postDeleteMessage
  } = require('../controllers/messageController');

router.get('/', getAllMessages);

router.get('/new', (req, res, next) => {
  res.render('form');
});

router.post('/new', writeMessageToDb);

router.get('/:messageId', getMessageById);

router.get('/:messageId/delete', getDeleteMessage);

router.post('/:messageId/delete', postDeleteMessage);


module.exports = router;
