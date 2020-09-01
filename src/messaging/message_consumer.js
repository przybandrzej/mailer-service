const mailsQueue = require('../../config/rabbitmq_config').queues.mails;
const log = require('pino')({ prettyPrint: true });
const mailerController = require('../controllers/mail_ctrl');

const start = (connection) => {
    connection.createChannel(function (error1, channel) {
        if (error1) {
            log.error("[AMQP - consumer]", error1.message);
            throw error1;
        }
        channel.assertQueue(mailsQueue, {
            durable: true
        });
        log.info("[AMQP - consumer] connected.");
        log.info("[AMQP - consumer] Waiting for messages in %s.", mailsQueue);

        channel.consume(mailsQueue, function (msg) {
            log.info(" [AMQP - consumer] Received message: %s.", msg.content);
            mailerController.sendMail(msg, true);
        }, {
            noAck: true
        });
    });
}

module.exports = { start };