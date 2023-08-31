var express = require('express');
var router = express.Router();
const { getAllMessages, writeMessageToDb } = require("../controllers/messageController");

/* GET home page. */
router.get('/', getAllMessages);

router.get('/new', (req, res, next) => {
  res.render('form');
});

router.post('/new', writeMessageToDb);

module.exports = router;
