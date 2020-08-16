const mongoose = require('mongoose');
const timestampPlugin = require('./plugins/timestamp');

let errorSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    command: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    },
    request_body: {
        type: Object,
        required: true
    }
});

errorSchema.plugin(timestampPlugin);

module.exports = mongoose.model('EmailError', errorSchema);