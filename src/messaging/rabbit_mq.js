const url = require('../../config/rabbitmq_config').url;
const sender = require('./message_producer');
const receiver = require('./message_consumer');
const log = require('pino')({ prettyPrint: true });

let amqpConn = [];
let processExit = false;

const start = () => {
    log.info("[AMQP] connecting...");
    connect(receiver);
    connect(sender);
}

const connect = (worker) => {
    const amqp = require('amqplib/callback_api');
    amqp.connect(url, function (err, conn) {
        if (err) {
            log.error("[AMQP]", err.message);
            return setTimeout(start, 5000);
        }
        conn.on("error", function (err) {
            if (err.message !== "Connection closing") {
                log.error("[AMQP] connection error. ", err.message);
                log.error(err);
            }
            log.error(err);
        });
        conn.on("close", function () {
            if (processExit) {
                return;
            }
            log.info("[AMQP] reconnecting");
            return setTimeout(start, 5000);
        });
        amqpConn.push(conn);
        worker.start(conn);
    });
};

process.on('exit', (code) => {
    log.info("[AMQP] closing connection.");
    processExit = true;
    for (conn of amqpConn) {
        conn.close();
        log.info("[AMQP] connection closed.");
    }
});

module.exports = { start };