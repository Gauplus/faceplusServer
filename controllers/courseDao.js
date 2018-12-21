var async = require('async');
var mongoClient = require('mongodb').MongoClient;


exports.query = async function(tid){             //根据教师tid 查询其课程
    /*
    * @param tid  teacher tid
    * return  course 的详细信息
    * */
    var url = 'mongodb://localhost:27017/Looking';
    let db, result;
    try{
        db = await mongoClient.connect(url);
        var courseTable = await db.db("Looking").collection("course");
        result = await courseTable.find ({tid :"12345"}).toArray();
        // console.log(result[0]);
        var course = [];
        var i;
        for(i=0;i<result.length;i++)
        {
            course.push(result[i]);
        }
        // console.log(course);
       return course;
    }catch(e){
        console.error(e.message);
    }

};

exports.getTeacherInfo = async function(tid){
    /*
    * @param tid  teacher tid
    * @param pwd  teacher pwd
    * return  0   no register  尚未注册
    *         1   pwd erro     密码错误
    *         2   pass         验证成功
    *         -1   其他错误
    * */
    var url = 'mongodb://localhost:27017/Looking';
    let db, result,index;
    try{
        db = await mongoClient.connect(url);
        var teacherTable = await db.db("Looking").collection("teacher");
        result = await teacherTable.findOne({tid :tid});
        var info = {tid:result.tid,tname:result.tname};
        console.log(info);
        return info;
    }catch(e){
        console.error(e.message);
    }

    return index;
};



exports.insert =   async function (tid, tname, pwd) {
    /*
    * @param tid 教师id
    * @param tname 教师姓名
    * @param pwd 密码
    * return 0 注册失败
    *        1 注册成功
    *        2 已经注册
    */

    var url = 'mongodb://localhost:27017/Looking';
    let db, result, index;
    try {

        db = await mongoClient.connect(url);
        var teacherTable = await db.db("Looking").collection("teacher");
        result = await teacherTable.findOne({tid: tid});
        if (result === null) {
            result = await teacherTable.insertOne({tid: tid, tname: tname, pwd: pwd})
            index = 1;
        } else if (result.tid === tid) {
            index = 2;
        } else {
            index = 0
        }
        return index;
    } catch (e) {
        console.log(e.message);
    }
};





exports.getStudentList  =   async function (tid,ctime,place,cid) {
    /*
    * @param tid 教师id
    * @param ctime 课程时间
    * @param cplace 课程地点
    * @param cid  课程id
    * return studentList 学生列表
    */

    var url = 'mongodb://localhost:27017/Looking';
    let db, result, index;
    try {

        db = await mongoClient.connect(url);
        var courseTable = await db.db("Looking").collection("course");
        result = await courseTable.find({tid: tid});
        var i
        var slist=[];
        for(i=0;i<result.length;i++)
        {
            var student = {
                name:result[i].sname,
                sid: result[i].sid,
            }
            slist.push(student);
        }

        return slist;
    } catch (e) {
        console.log(e.message);
    }
};

exports.delete =   async function (tid, tname, pwd) {   //暂时用不到
    /*
    * @param tid 教师id
    * @param tname 教师姓名
    * @param pwd 密码
    * return 0 注册失败
    *        1 注册成功
    *        2 已经注册
    */

};




