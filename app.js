var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/home');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  const language = req.acceptsLanguages('en', 'es', 'pr');
  if (language) {
    req.language = language;
  } else {
    req.language = 'es'
  }
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ventas', require('./routes/ventas'));

module.exports = app;
