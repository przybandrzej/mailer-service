const express = require('express');
const log = require('pino')({ prettyPrint: true });
const router = express.Router();
const mailCtrl = require('../controllers/mail_ctrl');

router.post('/send', (req, res, next) => {
    log.debug('REST request to send a mail: ' + JSON.stringify(req.body));
    let mailerResonse = require('../model/mailerResponse');
    mailerResponse.message = 'Mail has been sent!';
    mailCtrl.sendMail(req.body);
    return res.status(200).json(mailerResonse);
});

module.exports = router;