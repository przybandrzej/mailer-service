module.exports = () => {
    let config = {
        pool: true,
        debug: process.env.DEBUG,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASSWORD
        }
    }
    const service = process.env.MAILER_SERVICE;
    if (service) {
        config.service = service;
    } else {
        config.secure = process.env.MAILER_SECURE;
        config.host = process.env.MAILER_HOST;
        config.port = process.env.MAILER_PORT;
    }
    return config;
};