const components = require('./components');
const tags = require('./tags');
const paths = require('./paths');

module.exports = {
    openapi: '3.0.1',
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
    servers: [
        {
            url: 'http://localhost:3000/',
            description: 'Local server'
        },
        {
            url: 'https://api_url_testing',
            description: 'Testing server'
        },
        {
            url: 'https://api_url_production',
            description: 'Production server'
        }
    ],
    tags: tags,
    paths: paths,
    components: components
};