const log = require('pino')({ prettyPrint: true });
const nodemailer = require('nodemailer');
const mailerConfig = require('../../config/mail_config');

const transporter = nodemailer.createTransport(mailerConfig);

const sendMail = async (message) => {
    const info = await transporter.sendMail(message);
    log.debug('Mail sending result: ' + JSON.stringify(info));
    return info;
};

const mailerHealth = () => {
    return mailerInfo;
}

transporter.verify((error, success) => {
    if (error) {
        log.error(error);
        mailerInfo.message = error;
        mailerInfo.ready = false;
    } else {
        log.info({
            success,
            message: 'Server is ready to take messages'
        });
        mailerInfo.ready = true;
        mailerInfo.message = 'Server is ready to take messages';
    }
});

let mailerInfo = {
    ready: false,
    message: 'Mailer service is not ready yet.'
};

const testMessage = {
    from: "stk.uep@interia.pl",
    to: "andrzej.przybysz01@gmail.com",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>"
};

module.exports = { sendMail, mailerHealth };