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


var face = require('./facepp_sdk/facepp_sdk');
// dao.query("12345");
// tdao.getTeacherInfo("12345");

const apikey = '2eUS6nEMoyY6FQWH78TSyjsMtmQrJsla';
const apisecret = 'QkC_P5WsmcQQOC9i_JBW0MhV4tIcUaqx';


async function test() {


  var facepp = new face.FACEPP(apikey, apisecret, 1);
  let attributes = 'smiling,headpose,eyestatus,emotion,ethnicity,eyegaze';
  let dic = {'image_url':'https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic6.jpg' , 'return_attributes': attributes};

  function success(e) {
    console.log("成功");
    console.log(e);
  }

  function failed(e) {
    console.log("失败");
    console.log(e);

  }
  var result = await facepp.detectFace(dic,success,failed);
  console.log(result);

};











var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  // console.log("http://"+host+":" +port);
  console.log("启动成功");
 test();
});

module.exports = app;