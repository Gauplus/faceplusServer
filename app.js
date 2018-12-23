var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var FormData = require('FormData');

var app = express();

var bodyParser = require('body-parser');



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
// var studentListDao = require('./controllers/studentListDao');
//
// studentListDao.query("654001","12-16周周二第三大节 周四第四大节","一工202");

//
// async function test() {
//
//
//   var facepp = new face.FACEPP(apikey, apisecret, 1);
//   let attributes = 'smiling,headpose,eyestatus,emotion,ethnicity,eyegaze';
//   let dic = {'image_url':'./public/images/邹溪蕊.jpg' , 'return_attributes': attributes};
//
//   function success(e) {
//     console.log("成功");
//     console.log(e);
//   }
//
//   function failed(e) {
//     console.log("失败");
//     console.log(e);
//
//   }
//   var result = await facepp.detectFace(dic,success,failed);
//   console.log(result);
//
// };







 var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("启动成功");
});

module.exports = app;