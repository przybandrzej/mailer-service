const health = {
    tags: ['API health'],
    operationId: 'apiHealth',
    description: 'Provides API\'s health params',
    parameters: [],
    responses: {
        '200': {
            schema: {
                $ref: '#/definitions/apiHealth'
            }
        }
    }
};

const unsupported = {
    tags: ['Unsupported paths'],
    operationId: 'unsupported',
    parameters: [],
    responses: {
        '200': {
            description: 'Redirects to the Healt edpoint',

            schema: {
                $ref: '#/definitions/apiHealth'
            }
        }
    }
};

module.exports = {
    '/mail/send': {
        post: {
            tags: ['Mail operations'],
            description: 'Send email',
            operationId: 'sendMail',
            parameters: [
                {
                    in: 'body',
                    name: 'mail',
                    required: true,
                    schema: {
                        $ref: '#/definitions/email'
                    }
                }
            ],
            responses: {
                '200': {
                    description: 'Email was sent',
                    schema: {
                        $ref: '#/definitions/mailSentResponse'
                    }
                }
            }
        }
    },
    '/*': {
        get: unsupported,
        post: unsupported,
        put: unsupported,
        delete: unsupported,
        patch: unsupported
    },
    '/': {
        get: health,
        post: health,
        put: health,
        delete: health,
        patch: health
    }
};