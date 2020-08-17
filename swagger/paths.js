const health = {
    tags: ['API health'],
    operationId: 'apiHealth',
    description: 'Provides API\'s health params',
    parameters: [],
    responses: {
        '200': {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/apiHealth'
                    }
                }
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
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/apiHealth'
                    }
                }
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
            parameters: [],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/email'
                        }
                    }
                },
                required: true
            },
            responses: {
                '200': {
                    description: 'Email was sent',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/mailSentResponse'
                            }
                        }
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