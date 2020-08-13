var express = require('express');
var router = express.Router();
var health = require('./health');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(health);
});

/* Redirect unsupported routes */
router.all('*', (req, res, next) => res.redirect('/'));

module.exports = router;
