var express = require('express');
var mailer = require('../services/mailer');
const log = require('pino')({ level: 'debug' });
var router = express.Router();

router.get('/send', (req, res, next) => {
    log.debug('REST request to send a mail: ' + req.body);
    mailer.sendMail(req.body).then(info => {
        return res.status(200).json(info);
    });
});

module.exports = router;