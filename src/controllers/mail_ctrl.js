const emailService = require('../services/email_service');
const emailErrorService = require('../services/email_error_service');
const mailer = require('../services/mailer');
const Email = require('../model/email_schema');
const EmailError = require('../model/email_error_schema');
const log = require('pino')({ prettyPrint: true });
const mailerConfig = require('../../config/mail_config');

class MailCtrl {

    constructor() { }

    sendMail(mail) {
        mail = setEmailFrom(mail);
        mailer.sendMail(mail).then(info => {
            const email = new Email(mail);
            emailService.createOne(email).then(
                info => log.info(info)
            ).catch(err => log.error(err));
        }).catch(error => {
            log.error(error);
            const emailError = new EmailError({
                code: error.code,
                command: error.command,
                type: error.name,
                msg: error.message,
                request_body: mail
            });
            emailErrorService.createOne(emailError).then(
                info => log.info(info)
            ).catch(err => log.error(err));
        });
    }

}

const setEmailFrom = (message) => {
    let email = mailerConfig.auth.user;
    if (!email.includes('@')) {
        let host = mailerConfig.host;
        const first = host.indexOf('.');
        const last = host.lastIndexOf('.');
        if (first !== last) {
            if (host.substring(first, last).indexOf('.') === -1) {
                host = host.substring(first + 1);
            } else {
                host = host.substring(host.lastIndexOf('.') + 1);
            }
        }
        email = email + '@' + host;
    }
    message.add({ from: email });
    return message;
};

module.exports = new MailCtrl();
