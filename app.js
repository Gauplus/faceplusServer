var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const loginRouter = require('./routes/login/login');
// const siginRouter = require('./routes/login/signin');

app.use('/login',loginRouter);
// app.use('/signin',siginRouter);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("http://"+host+":"+post);
  console.log("启动成功");
})

module.exports = app;