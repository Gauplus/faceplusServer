var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var FormData = require('FormData');
var fs = require('fs');
var app = express();
var qs= require('querystring');
// var Buffer = require('buffer');
// var bodyParser = require('body-parser');

app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var dao = require('./controllers/courseDao');
var tdao = require('./controllers/teacherInfoDao');
require('./routes/routeAPi.js')(app);
var face = require('./controllers/faceApi');
var attendenAPI = require('./attendence/attendenAPI');




  var server = app.listen(3000, function () {
  console.log("启动成功");

});

module.exports = app;