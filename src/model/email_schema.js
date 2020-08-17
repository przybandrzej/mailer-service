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
    subject: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    html: {
        type: String
    },
    cc: {
        type: String
    },
    bcc: {
        type: String
    },
    replyTo: {
        type: String
    },
    priority: {
        type: String,
        enum: ['high', 'normal', 'low']
    },
    date: {
        type: Date
    },
    envelope: {
        from: String,
        to: String,
        cc: String,
        bcc: String
    },
    dsn: {
        id: String,
        return: {
            type: String,
            enum: ['full', 'headers']
        },
        notify: {
            type: [String],
            enum: ['success', 'failure', 'delay', 'never']
        },
        recipient: String
    },
    icalEvent: {
        filename: String,
        method: String,
        content: String,
        path: String,
        href: String,
        encoding: String
    },
    attachmets: [
        {
            filename: String,
            content: String,
            path: String,
            href: String,
            httpHeaders: String,
            contentType: String,
            cid: String,
            encoding: String,
            headres: String,
            raw: String
        }
    ]
});

emailSchema.plugin(timestampPlugin);

module.exports = mongoose.model('Email', emailSchema);