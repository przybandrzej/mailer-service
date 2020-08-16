const mongoose = require('mongoose');
const timestampPlugin = require('./plugins/timestamp');

let emailSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    html: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
});

emailSchema.plugin(timestampPlugin);

module.exports = mongoose.model('Email', emailSchema);