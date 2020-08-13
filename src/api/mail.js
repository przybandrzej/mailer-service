var express = require('express');
var mailer = require('../services/mailer');
const log = require('pino')({ level: 'info' });
var router = express.Router();

router.get('/send', (req, res, next) => {
    const info = mailer();
    return res.status(200).json(
        {
            accepted: info.accepted,
            response: info.response,
            envelope: info.envelope
        }
    );
});

module.exports = router;