const definitions = require('./definitions');
const tags = require('./tags');
const paths = require('./paths');

module.exports = {
    swagger: '2.0',
    info: {
        version: '1.0.0',
        title: 'Mailer service API',
        description: 'Mailer service for microservices architecture for sending emails.',
        termsOfService: '',
        contact: {
            name: 'Andrzej Przybysz',
            email: 'andrzej.przybysz01@gmail.com',
            url: 'https://github.com/przybandrzej'
        },
        license: {
            name: 'MIT'
        }
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: [
        'application/json'
    ],
    produces: [
        'application/json'
    ],
    tags: tags,
    paths: paths,
    definitions: definitions
};