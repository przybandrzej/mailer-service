var express = require('express');
var mailer = require('../services/mailer')
var router = express.Router();

router.post('/send', mailer.sendMail);

module.exports = router;