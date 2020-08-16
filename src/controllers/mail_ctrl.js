const emailService = require('../services/email_service');
const emailErrorService = require('../services/email_error_service');
const { pick } = require('../helpers/objects');
const mailer = require('../services/mailer');
const Email = require('../model/email_schema');
const EmailError = require('../model/email_error_schema');
const log = require('pino')({ prettyPrint: true });

class MailCtrl {

    constructor() { }

    sendMail(mail) {
        let mailerResonse = {
            message: 'Mail has been sent!',
            time: +new Date()
        }
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
        return mailerResonse;
    }

}

module.exports = new MailCtrl();
