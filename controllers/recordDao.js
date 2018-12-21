var async = require('async');
var mongoClient = require('mongodb').MongoClient;


exports.query = async function(cid,tid,ctime,place){             //根据课程信息返回一个签到记录表
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

        var recordlist = [];
        var i;
        for(i=0;i<result.length;i++)
        {
            recordlist.push(result[i]);
        }
        // console.log(course);
        return recordlist;
    }catch(e){
        console.error(e.message);
    }

};



exports.insert =   async function (tid,sid,sname,time,isAttend,state) {         //人脸识别签到时用于记录签到信息
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
            result = await teacherTable.insertMany()
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





exports.modify =   async function (tid,ctime,place,cid) {  //留着用于补签

};

exports.delete =   async function (tid, tname, pwd) {   //暂时用不到


};




