const amqp = require('amqplib/callback_api');
const url = require('../../config/rabbitmq_config').url;
const sender = require('./message_producer');
const receiver = require('./message_consumer');
const log = require('pino')({ prettyPrint: true });
let amqpConn = null;

const start = () => {
    log.info("[AMQP] connecting...");
    amqp.connect(url, function (err, conn) {
        if (err) {
            log.error("[AMQP]", err.message);
            return setTimeout(start, 1000);
        }
        conn.on("error", function (err) {
            if (err.message !== "Connection closing") {
                log.error("[AMQP] connection error. ", err.message);
            }
        });
        conn.on("close", function () {
            log.info("[AMQP] reconnecting");
            return setTimeout(start, 1000);
        });

        log.info("[AMQP] connected.");
        amqpConn = conn;
        receiver.start(conn);
        sender.start(conn);
    });
}

process.on('exit', (code) => {
    log.info("[AMQP] closing connection.");
    if (amqpConn) {
        amqpConn.close();
        log.info("[AMQP] connection closed.");
    }
});

module.exports = { start };