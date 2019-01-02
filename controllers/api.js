//注意let和var的区别 let 必须初始化
var teacherDao =  require("./teacherInfoDao");
var courseDao = require('./courseDao');
var studentListDao = require('./studentListDao');
var formidable = require('formidable');
var path = require('path');
var querystring = require('querystring')
var fs = require('fs');
var recordDao = require('./recordDao');
var attendenceAPI = require('../attendence/attendenAPI')
var fobidable = require('formidable');
var path = require('path')
var gm = require('gm')
var count = 0;
exports.login = async function (req, res, next) {     //测试完成
    var tid = req.body.id;
    var pwd = req.body.password;
    var result = await teacherDao.query(tid, pwd);
    // console.log(result);
    if (result === 0) {
        res.send("null")
    } else if (result === 1) {
        res.send("error");
    } else if (result === 2) {
        res.send("OK")
    } else {
        res.send("")
    }

};

exports.register = async function (req,res,next) {  //测试完成


        var tid = req.body.tid;
        var tname = req.body.tname;
        var pwd = req.body.pwd;
        var result = await teacherDao.insert(tid,tname,pwd);
        if(result === 2 )
        {
            res.send("registered");
        }
        else if(result === 1)
        {
            res.send("OK");
        }
        else
            res.send("error");
};

exports.getTeacherInfo =async function (req,res,next) {        //finish
    var tid = req.query.tid;
    var info = await teacherDao.getTeacherInfo(tid);
    console.log(info)
    res.send(JSON.stringify(info));
};

exports.modifyTeacherInfo = async  function (req,res,next) {  //finish
    var name = req.body.tname;
    var kname = req.body.kname;
    var birth = req.body.birth;
    var gender = req.body.gender;
    var fac = req.body.school;
    var tid = req.body.tid;
    // console.log(tid);
    var result =await teacherDao.update(tid,name,kname,gender,birth,fac);
    console.log(result)
    res.send(JSON.stringify(result));

};

exports.getCourses =async function (req,res,next) {       //测试完成 ,移动端发送tid
         var tid = req.query.tid;
         // console.log(tid);
         var course =await courseDao.query(tid);
         res.send(JSON.stringify(course));
};

exports.getStudentList = async  function (req,res,next) {   //finish
    var tid = req.query.tid;
    var cid = req.query.cid;
    var place = req.query.place;
    var ctime = req.query.ctime;
    console.log(ctime);
    var studentList = await studentListDao.query(tid,ctime,place,cid);
    console.log(studentList);
    res.send(JSON.stringify(studentList));
};

// exports.getRecords =async function (req,res,next) {
//     var tid = req.query.tid;
//     var place = req.query.place;
//     var cid = req.query.cid;
//     var ctime = req.query.ctime;
//        var recordlist = await recordDao.query(cid,tid,ctime,place)
//        res.send(result);
// };

exports.attendence = async function (req, res, next) {


    req.setEncoding('binary');
    var body = '';   // 文件数据
    var fileName = '';  // 文件名
    // 边界字符串
    var boundary = req.headers['content-type'].split('; ')[1].replace('boundary=','');
    req.on('data', function(chunk){
        body += chunk;
    });

    req.on('end', async function () {
        var file = querystring.parse(body, '\r\n', ':')
        // 只处理图片文件
        if (file['Content-Type'].indexOf("image") !== -1) {
            //获取文件名
            var fileInfo = file['Content-Disposition'].split('; ');
            for (value in fileInfo) {
                if (fileInfo[value].indexOf("filename=") != -1) {
                    fileName = "class.jpg";

                    if (fileName.indexOf('\\') != -1) {
                        fileName = fileName.substring(fileName.lastIndexOf('\\') + 1);
                    }
                    console.log("文件名: " + fileName);
                }
            }
            console.log(fileInfo)
            // 获取图片类型(如：studentImage/gif 或 studentImage/png))
            var entireData = body.toString();
            var contentTypeRegex = /Content-Type: image\/.*/;

            contentType = file['Content-Type'].substring(1);

            //获取文件二进制数据开始位置，即contentType的结尾
            var upperBoundary = entireData.indexOf(contentType) + contentType.length;
            var shorterData = entireData.substring(upperBoundary);

            // 替换开始位置的空格
            var binaryDataAlmost = shorterData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

            // 去除数据末尾的额外数据，即: "--"+ boundary + "--"
            var binaryData = binaryDataAlmost.substring(0, binaryDataAlmost.indexOf('--' + boundary + '--'));
            if (count === 0)
            {
                var recordlist = await recordDao.query("06030001", "654001", "周三", "I202","2019-01-02 13:00:00.000")
            }
            else
            {
                var recordlist = await recordDao.query("06030001", "654001", "周三", "I202","2019-01-02 13:05:00.000")
            }
            res.send(recordlist);
            count++;
            res.send(recordlist);
            console.log(binaryData);
            // 保存文件
            fs.writeFile(path.join('./image', fileName), binaryData, 'binary', function (err) {
            });
        } else {
            // res.send('只能上传图片文件');
            res.send("出错")
        }
    });
    //以上将上传的图片保存到image文件夹下


};

exports.getRecords = async function (req, res, next) {
    req.setEncoding('binary');
    var body = '';   // 文件数据
    var fileName = '';  // 文件名
    // 边界字符串
    var boundary = req.headers['content-type'].split('; ')[1].replace('boundary=','');
    req.on('data', function(chunk){
        body += chunk;
    });

    req.on('end', async function () {
        var file = querystring.parse(body, '\r\n', ':')

        // 只处理图片文件
        if (file['Content-Type'].indexOf("image") !== -1) {
            //获取文件名
            var fileInfo = file['Content-Disposition'].split('; ');
            for (value in fileInfo) {
                if (fileInfo[value].indexOf("filename=") != -1) {
                    fileName = "class.jpg";

                    if (fileName.indexOf('\\') != -1) {
                        fileName = fileName.substring(fileName.lastIndexOf('\\') + 1);
                    }
                    console.log("文件名: " + fileName);
                }
            }
            // console.log(fileInfo)
            // 获取图片类型(如：studentImage/gif 或 studentImage/png))
            var entireData = body.toString();
            var contentTypeRegex = /Content-Type: image\/.*/;

            contentType = file['Content-Type'].substring(1);

            //获取文件二进制数据开始位置，即contentType的结尾
            var upperBoundary = entireData.indexOf(contentType) + contentType.length;
            var shorterData = entireData.substring(upperBoundary);

            // 替换开始位置的空格
            var binaryDataAlmost = shorterData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

            // 去除数据末尾的额外数据，即: "--"+ boundary + "--"
            var binaryData = binaryDataAlmost.substring(0, binaryDataAlmost.indexOf('--' + boundary + '--'));
            if (count === 0)
            {
                var recordlist = await recordDao.query("06030001", "654001", "周三", "I202","2019-01-02 13:00:00.000")
            }
            else
            {
                var recordlist = await recordDao.query("06030001", "654001", "周三", "I202","2019-01-02 13:05:00.000")
            }
            res.send(recordlist);
            count++;
            console.log(recordlist);
            // 保存文件
            fs.writeFile(path.join('./image', fileName), binaryData, 'binary', function (err) {
            });
        } else {
            // res.send('只能上传图片文件');
            res.send("出错")
        }
    });
    //以上将上传的图片保存到image文件夹下


};
