const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const indexRouter = require('./src/api/index');
const mailRouter = require('./src/api/mail');

var app = express();

const mailer = require('./src/services/mailer');
const mongo = require('./src/services/database');
const rabbitmq = require('./src/messaging/rabbit_mq');

//start rabbitmq when mailer is connected
mailer.whenConnected(rabbitmq.start);
// establish db connection
mongo.start();
// start mailer when mongo connection is established
mongo.whenConnected(mailer.start);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

app.use('/mail', mailRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
