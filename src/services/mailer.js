const log = require('pino')({ prettyPrint: true });
const nodemailer = require('nodemailer');
const mailerConfig = require('../../config/mail_config');

let transporter = null;
let connectionCallback = null;

const start = () => {
    transporter = nodemailer.createTransport(mailerConfig());
    transporter.verify((error, success) => {
        if (error) {
            log.error('[Mailer] connection error: ' + JSON.stringify(error));
            mailerInfo.message = error;
            mailerInfo.ready = false;
        } else {
            log.info('[Mailer] Server is ready to take messages');
            mailerInfo.ready = true;
            mailerInfo.message = 'Server is ready to take messages';
            if (connectionCallback) {
                connectionCallback();
            }
        }
    });
}

const sendMail = async (message) => {
    const info = await transporter.sendMail(message);
    log.debug('[Mailer] Mail sending result: ' + JSON.stringify(info));
    return info;
};

const mailerHealth = () => {
    return mailerInfo;
}

let mailerInfo = {
    ready: false,
    message: 'Mailer service is not ready yet.'
};

const whenConnected = (callback) => {
    if (typeof callback !== 'function') {
        log.error('[Mailer] callback must be a function type.');
    }
    if (callback) {
        connectionCallback = callback;
    }
};

module.exports = { start, sendMail, mailerHealth, whenConnected };