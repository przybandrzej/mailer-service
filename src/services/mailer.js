const log = require('pino')({ level: 'info' });
const nodemailer = require('nodemailer');
const mailerConfig = require('../../config/mail_config');

const transporter = nodemailer.createTransport(mailerConfig);

const sendMail = async ({ message }) => {
    const info = await transporter.sendMail(message);
    log.info(info);
    return info;
};

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log({ success });
        console.log('Server is ready to take our messages');
    }
});

module.exports = async function () {
    const info = await transporter.sendMail(msg);
    log.info(info);
    return info;
};

const msg = {
    from: "stk.uep@interia.pl",
    to: "andrzej.przybysz01@gmail.com",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>"
};

// module.exports = sample;