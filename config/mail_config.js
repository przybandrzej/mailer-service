module.exports = {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: process.env.MAILER_SECURE,
    pool: true,
    debug: process.env.DEBUG,
    auth: {
        user: 'botdeployment.test@wp.pl',
        pass: 'rqygqDP9eagk'
    }
};