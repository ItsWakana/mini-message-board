const express = require('express');
const router = express.Router();
const { getMessageById } = require('../controllers/messageController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:messageId', getMessageById);

module.exports = router;
