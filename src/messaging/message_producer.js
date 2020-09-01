const resultsQueue = require('../../config/rabbitmq_config').queues.results;
const log = require('pino')({ prettyPrint: true });
let producerChannel = null;

const start = (connection) => {
    connection.createChannel(function (error1, channel) {
        if (error1) {
            log.error("[AMQP - producer]", error1.message);
            throw error1;
        }
        channel.assertQueue(resultsQueue, {
            durable: true
        });
        producerChannel = channel;
        log.info("[AMQP - producer] connected.");
    });
}

const sendResult = (message) => {
    if (producerChannel) {
        producerChannel.sendToQueue(resultsQueue, Buffer.from(message, 'utf-8'));
        log.info(" [AMQP - producer] Sent message to %s: %s", resultsQueue, message);
        return;
    }
    log.error('[AMQP - producer] Channel is null');
}

module.exports = { start, sendResult };