const mongoose = require('mongoose');
const timestampPlugin = require('./plugins/timestamp');

let emailSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        validate: (value) => {
            return validator.isFrom(value)
        }
    },
    to: {
        type: String,
        required: true,
        validate: (value) => {
            return validator.isTo(value)
        }
    },
    text: {
        type: String,
        required: true,
        validate: (value) => {
            return validator.isText(value)
        }
    },
    html: {
        type: String,
        required: true,
        validate: (value) => {
            return validator.isHtml(value)
        }
    },
    subject: {
        type: String,
        required: true,
        validate: (value) => {
            return validator.isSubject(value)
        }
    }
});

emailSchema.plugin(timestampPlugin);

module.exports = mongoose.model('Email', emailSchema);