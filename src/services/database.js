const mongoose = require('mongoose');
const mongoConfig = require('../../config/mongo_config');
const log = require('pino')({ prettyPrint: true });
let mongo_health = require('../api/health').mongo_health;

const start = () => {
    mongoose.connect(mongoConfig.url, mongoConfig.options)
        .then((client) => {
            log.info('MongoDb connection established.');
            mongo_health.ready = true;
            mongo_health.message = 'MongoDb connection established.';
        })
        .catch(error => {
            log.error(error);
            mongo_health.ready = false;
            mongo_health.message = error;
        });
};

const whenConnected = (callback) => {
    if (typeof callback !== 'function') {
        log.error('[MongoService] callback must be a function type.');
    }
    if (callback) {
        mongoose.connection.on('connected', callback);
    }
};

module.exports = { start, whenConnected };