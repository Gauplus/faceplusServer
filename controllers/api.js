//注意let和var的区别 let 必须初始化
var teacherDao =  require("./teacherInfoDao")
exports.login = async function (req, res, next) {
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

exports.register = async function (req,res,next) {


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

exports.getTeacherInfo =async function (req,res,next) {
    var tid = req.body.tid;
    var info = await teacherDao.getTeacherInfo(tid);
    res.send(JSON.stringify(info));
};

exports.modifyTeacherInfo = function (req,res,next) {

};

exports.getCourses = function (req,res,next) {

};

exports.getStudentList = function (req,res,next) {

};

exports.getRecords = function (req,res,next) {
       res.send("get Record sucessful");
};

exports.attendence = function(req,res,next){

}