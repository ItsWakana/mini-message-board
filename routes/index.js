var express = require('express');
var router = express.Router();
const { getAllMessages, writeMessageToDb } = require("../controllers/messageController");

//instead of loading messages on the default route on homepage, lets just say welcome to message board, then we can define our message list in the actual message routes.

router.get('/', (req, res, next) => {
  res.send("Welcome to the message board");
});

// router.get('/new', (req, res, next) => {
//   res.render('form');
// });

// router.post('/new', writeMessageToDb);

module.exports = router;
