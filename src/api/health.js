const mailer = require('../services/mailer');

const health = {
    active: true,
    version: process.env.VERSION,
    application_name: process.env.APP_NAME,
    mailer_health: mailer.mailerHealth()
};

module.exports = health;