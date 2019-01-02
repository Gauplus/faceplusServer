var async = require('async');
var mongoClient = require('mongodb').MongoClient;


exports.query = async function(cid,tid,ctime,place,time){             //根据课程信息返回一个签到记录表
    /*
    * @param tid  teacher tid
    * return  course 的详细信息
    * */
    var url = 'mongodb://localhost:27017/Looking';
    let db, result;
    try{
        db = await mongoClient.connect(url);
        var courseTable = await db.db("Looking").collection("record");
        result = await courseTable.find ({tid :tid,time:time}).toArray();

        var recordlist = [];
        for(let i of result)
        {
            recordlist.push(i);
        }
        // console.log(course);
        return recordlist;
    }catch(e){
        console.error(e.message);
    }

};



exports.insert =   async function (tid,sid,sname,time,isAttend,state) {         //人脸识别签到时用于记录签到信息
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

exports.insertHere =   async function (tid,sid,place,cid,ctime) {         //人脸识别签到时用于记录已经签到的
    var url = 'mongodb://localhost:27017/Looking';
    let db, result;
    try {
        db = await mongoClient.connect(url);
        var studentTable = await db.db("Looking").collection("student");
        result = await studentTable.findOne({sid: sid});
        var recordTable = await db.db("Looking").collection("record");
        recordTable.updateOne({sid: sid},{$set:{sname:result.sname,time:new Date,isAttend:true},state:"听课",tid:tid,ctime:ctime,cid:cid});

    } catch (e) {
        console.log(e.message);
    }
};



exports.modify =   async function (tid,ctime,place,cid,sid) {  //留着用于补签

};

// exports.delete =   async function (tid, tname, pwd) {   //暂时用不到
//
//
// };




