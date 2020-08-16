const { MailService } = require('../services/mailService');
const { pick } = require('../helpers/objects');
const mailer = require('../services/mailer');
let Email = require('../model/email_schema');
const log = require('pino')({ level: 'debug' });

class MailCtrl {

    constructor() { }

    sendMail(mail) {
        let mailerResonse = {
            message: 'Mail has been sent!',
            time: new Date()
        }
        mailer.sendMail(mail).then(info => {
            log.debug(info);
            //MailService.createOne(info);
            // save to database success
        }).catch(error => {
            log.debug(error);
            // save to database error
        });
        return mailerResonse;
    }

}

module.exports = new MailCtrl();
