var express = require('express');
var router = express.Router();
var health = require('./health');
const swaggerSpec = require('../../swagger/openApiDocumentation');
const swaggerUi = require('swagger-ui-express');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).json(health);
});

router.get('/v3/api-docs', (req, res) => {
  res.status(200).json(swaggerSpec);
});

router.get('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Redirect unsupported routes */
router.all('*', (req, res, next) => res.redirect('/'));

module.exports = router;
