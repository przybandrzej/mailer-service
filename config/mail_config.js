module.exports = {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: process.env.SECURE,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
};