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
        db = await mongoClient.connect(url,{useNewUrlParser: true});
        var courseTable = await db.db("Looking").collection("course");
        result = await courseTable.find({tid:tid}).toArray();
        console.log(result);
        var course = [];
        var i;

        for(i=0;i<result.length;i++)
        {
            var info = {
                cid:result[i].cid,
                cname:result[i].cname,
                place:result[i].place,
                ctime:result[i].ctime
            }
            course.push(info);
        }
        // console.log(course);
        db.close();
       return course;
    }catch(e){
        console.error(e.message);
    }

};




exports.insert =   async function (cid, cname, place) {
    /*
    * @param cid 课程id
    * @param cname 课程名
    * @param place 地点
    * return 0 插入失败
    *        1 插入成功
    *        2 已经存在
    */

    var url = 'mongodb://localhost:27017/Looking';
    let db, result, index;
    try {

        db = await mongoClient.connect(url,{useNewUrlParser: true});
        var courseTable = await db.db("Looking").collection("course");
        result = await courseTable.findOne({cid: tid});
        if (result === null) {
            result = await teacherTable.insertOne({cid: cid, cname: cname, place: place,tid:tid})
            index = 1;
        } else if (result.cid === cid) {
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
        db.close();
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




