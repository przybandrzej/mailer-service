const log = require('pino')({ prettyPrint: true });
const nodemailer = require('nodemailer');
const mailerConfig = require('../../config/mail_config');

let transporter = null;

const start = () => {
    transporter = nodemailer.createTransport(mailerConfig());
    transporter.verify((error, success) => {
        if (error) {
            log.error(JSON.stringify(error));
            mailerInfo.message = error;
            mailerInfo.ready = false;
        } else {
            log.info('Server is ready to take messages');
            mailerInfo.ready = true;
            mailerInfo.message = 'Server is ready to take messages';
        }
    });
}

const sendMail = async (message) => {
    const info = await transporter.sendMail(message);
    log.debug('Mail sending result: ' + JSON.stringify(info));
    return info;
};

const mailerHealth = () => {
    return mailerInfo;
}

let mailerInfo = {
    ready: false,
    message: 'Mailer service is not ready yet.'
};

module.exports = { start, sendMail, mailerHealth };