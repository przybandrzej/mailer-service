const emailService = require('../services/email_service');
const emailErrorService = require('../services/email_error_service');
const mailer = require('../services/mailer');
const Email = require('../model/email_schema');
const EmailError = require('../model/email_error_schema');
const log = require('pino')({ prettyPrint: true });
const mailerConfig = require('../../config/mail_config')();
const resultSender = require('../services/rabbitmq_result_sender');

const sendMail = (mail, isFromRabbitMq) => {
    mail = setEmailFrom(mail);
    mailer.sendMail(mail).then(info => {
        log.debug('[Mail controller] Email has been sent.');
        const email = new Email(mail);
        if (isFromRabbitMq) {
            resultSender.sendPositiveResult(JSON.stringify(mail));
        }
        emailService.createOne(email)
            .then(info => { }/*log.info(JSON.stringify(info))*/)
            .catch(err => { }/*log.error(JSON.stringify(err))*/);
    }).catch(error => {
        log.error('[Mail controller] Error sending mail: ' + JSON.stringify(error));
        const emailError = new EmailError({
            code: error.code,
            command: error.command,
            type: error.name,
            msg: error.message,
            request_body: mail
        });
        if (isFromRabbitMq) {
            resultSender.sendNegativeResult(JSON.stringify(emailError));
        }
        emailErrorService.createOne(emailError)
            .then(info => { }/*log.info(JSON.stringify(info))*/)
            .catch(err => { }/*log.error(JSON.stringify(err))*/);
    });
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
    const emailPair = { from: email };
    let extendedMessage = JSON.parse(JSON.stringify(message));
    Object.assign(extendedMessage, emailPair);
    return extendedMessage;
};

module.exports = { sendMail };
