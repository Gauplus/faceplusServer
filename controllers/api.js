//注意let和var的区别 let 必须初始化

exports.login = function (req, res, next) {
          res.send("hello");

};

exports.register = function (req,res,next) {

    var teacherData = {
        tid: req.body.tid,
        tname: req.body.tname,
        pwd: req.body.password

    };
};
exports.getTeacherInfo = function (req,res,next) {

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