const mailsQueue = require('../../config/rabbitmq_config').queues.mails;
const log = require('pino')({ prettyPrint: true });
const mailerController = require('../controllers/mail_ctrl');

const start = (connection) => {
    connection.createChannel(function (error1, channel) {
        if (error1) {
            log.error("[AMQP - consumer]", error1.message);
            throw error1;
        }
        channel.assertQueue(mailsQueue, { durable: true }, function (err, _ok) {
            if (err) {
                log.error('[AMQP - consumer] ' + err.message);
                throw err;
            }

            channel.consume(mailsQueue, function (msg) {
                channel.ack(msg);
                const mailContent = msg.content.toString(msg.properties.contentEncoding);
                log.info(" [AMQP - consumer] Received message: %s.", mailContent);
                mailerController.sendMail(JSON.parse(mailContent), true);
            });
        });
        log.info("[AMQP - consumer] connected.");
        log.info("[AMQP - consumer] Waiting for messages in %s.", mailsQueue);
    });
}

module.exports = { start };