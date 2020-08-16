const mailer = require('../services/mailer');

module.exports = {
    active: true,
    version: process.env.VERSION,
    application_name: process.env.APP_NAME,
    mailer_health: mailer.mailerHealth(),
    mongo_health: {
        ready: false,
        message: 'Mongo service is not ready yet.'
    }
};