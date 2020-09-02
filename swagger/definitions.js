const emailSpec = require('./message_spec');

module.exports = {
    mailSentResponse: {
        type: 'object',
        description: 'Response after email was sent',
        properties: {
            message: {
                type: 'string'
            },
            time: {
                type: 'number',
                description: 'EPOCH time in miliseconds of the request'
            }
        }
    },
    apiHealth: {
        type: 'object',
        description: 'API\'s health',
        properties: {
            active: {
                type: 'string',
                description: 'Indicates if the server is active'
            },
            version: {
                type: 'string',
                description: 'API version'
            },
            application_name: {
                type: 'string'
            },
            mailer_health: {
                type: 'object',
                description: 'Provides info about mailer service connection',
                properties: {
                    ready: {
                        type: 'boolean'
                    },
                    message: {
                        type: 'string'
                    }
                }
            },
            mongo_health: {
                type: 'object',
                description: 'Provides info about mongo db connection',
                properties: {
                    ready: {
                        type: 'boolean'
                    },
                    message: {
                        type: 'string'
                    }
                }
            }
        }
    },
    email: emailSpec
};