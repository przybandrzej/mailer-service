const log = require('pino')({ level: 'info' });
const nodemailer = require('nodemailer');
const mailerConfig = require('../config/mailerConfig');

const transport = nodemailer.createTransport(mailerConfig);

exports.mailerFactory = () => {
    return {
        sendMail: async message => sendMail({ message })
    };
};


const sendMail = async ({ message }) => {
    const info = await transport.sendMail(message);
    log.info(info);
    return info;
};