//注意let和var的区别 let 必须初始化
var teacherDao =  require("./teacherInfoDao");
var courseDao = require('./courseDao');
exports.login = async function (req, res, next) {     //测试完成
    var tid = req.body.tid;
    var pwd = req.body.pwd;
    var result = await teacherDao.query(tid, pwd);
    console.log(result);
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

exports.getTeacherInfo =async function (req,res,next) {        //已测试
    var tid = req.body.tid;
    var info = await teacherDao.getTeacherInfo(tid);
    res.send(JSON.stringify(info));
};

exports.modifyTeacherInfo = function (req,res,next) {
    var name = req.name;
    var nickname = req.nickname;
    var birth = req.birth;
    var gender = req.gender;
    var school = req.school;
};

exports.getCourses =async function (req,res,next) {       //测试完成 ,移动端发送tid
         var tid = req.body.tid;
         var course =await courseDao.query(tid);
         res.send(JSON.stringify(course));
};

exports.getStudentList = function (req,res,next) {

};

exports.getRecords = function (req,res,next) {
       res.send("get Record sucessful");
};

exports.attendence = function(req,res,next){

};

exports.getStudentList = async function (req, res, next) {
    /*
    * 接受客户端上传的四个参数
    * @param tid 教师id
    * @param ctime 课程时间
    * @param place 课程地点
    * @param cid 课程id
    * return slist 学生列表
    */
    var tid = req.body.tid;
    var ctime = req.body.ctime;
    var place = req.body.place;
    var cid = req.body.cid;
    var slist = await courseDao.getStudentList(tid, ctime, place, cid);
    res.send(Json.stringify(slist));
};