const express = require('express');
const log = require('pino')({ level: 'debug' });
const router = express.Router();
const mailCtrl = require('../controllers/mail_ctrl');

router.get('/send', (req, res, next) => {
    log.debug('REST request to send a mail: ' + JSON.stringify(req.body));
    const response = mailCtrl.sendMail(req.body);
    return res.status(200).json(response);
});

module.exports = router;