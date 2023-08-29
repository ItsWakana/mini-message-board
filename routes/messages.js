var express = require('express');
var router = express.Router();
const Message = require("../models/message");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:messageId', async (req, res, next) => {
  try {
    const foundMessage = await Message.findById(req.params.messageId).exec();
    res.render('singleMessage', { message: foundMessage });
  } catch(err) {
    res.send("No message found with this id");
  }

})

module.exports = router;
