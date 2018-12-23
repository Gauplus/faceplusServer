//注意let和var的区别 let 必须初始化
var teacherDao =  require("./teacherInfoDao");
var courseDao = require('./courseDao');
var studentListDao = require('./studentListDao');


exports.login = async function (req, res, next) {     //测试完成
    var tid = req.body.tid;
    var pwd = req.body.pwd;
    var result = await teacherDao.query(tid, pwd);
    // console.log(result);
    if (result === 0) {
        res.send("尚未注册")
    } else if (result === 1) {
        res.send("用户名或密码错误");
    } else if (result === 2) {
        res.send("登录成功")
    } else {
        res.send("未知错误")
    }

};

exports.register = async function (req,res,next) {  //测试完成


        var tid = req.body.tid;
        var tname = req.body.tname;
        var pwd = req.body.pwd;
        var result = await teacherDao.insert(tid,tname,pwd);
        if(result === 2 )
        {
            res.send("您已注册，请前往登录");
        }
        else if(result === 1)
        {
            res.send("注册成功");
        }
        else
            res.send("未知错误");
};

exports.getTeacherInfo =async function (req,res,next) {        //finish
    var tid = req.query.tid;
    console.log(tid);
    var info = await teacherDao.getTeacherInfo(tid);
    res.send(JSON.stringify(info));
};

exports.modifyTeacherInfo = async  function (req,res,next) {  //finish
    var name = req.body.tname;
    var kname = req.body.kname;
    var birth = req.body.birth;
    var gender = req.body.gender;
    var fac = req.body.school;
    var tid = req.body.tid;
    teacherDao.update(tid,name,kname,gender,birth,fac);
    res.send("修改成功");

};

exports.getCourses =async function (req,res,next) {       //测试完成 ,移动端发送tid
         var tid = req.query.tid;
         console.log(tid);
         var course =await courseDao.query(tid);
         res.send(JSON.stringify(course));
};

exports.getStudentList = async  function (req,res,next) {   //finish
    var tid = req.query.tid;
    var cid = req.query.cid;
    var place = req.query.place;
    var ctime = req.query.ctime;
    console.log(tid);
    var studentList = await studentListDao.query(tid,ctime,place,cid);
    console.log(studentList);
    res.send(JSON.stringify(studentList));
};

exports.getRecords = function (req,res,next) {
       res.send("get Record sucessful");
};

exports.attendence = function(req,res,next){

};

