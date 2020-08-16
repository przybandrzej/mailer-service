const mongoose = require('mongoose');
const mongoConfig = require('../../config/mongo_config');
const log = require('pino')({ prettyPrint: true });
let mongo_health = require('../api/health').mongo_health;

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
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
    }
}

module.exports = new Database();