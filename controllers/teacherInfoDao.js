//对教师信息的增删查改
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://192.168.0.243:27017/myNewDatabase';

MongoClient.connect(url,function(err,db){
    assert.equal(null,err);
    console.log("Connection successfully to server");
    db.close();
});


exports.qureyInfo = function (req,res,next) {   //返回每个教师的json格式的数据

}


exports.insertInfo = function () {      //用于教师注册时增加数据库记录
      let tname = req.body.tname;
      let tid   = req.body.tid;
      let pwd   = req.body.pwd;
}

exports.modifyInfo = function () {

}

exports.deleteInfo = function () {

}


