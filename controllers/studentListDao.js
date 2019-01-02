var async = require('async');
var mongoClient = require('mongodb').MongoClient;
var studentDao = require('./studentDao');

exports.query = async function(tid,ctime,place,cid){             //根据课程信息返回一个签到记录表
    /*
    * @param tid  teacher tid
    * return  course 的详细信息
    * */
    var url = 'mongodb://localhost:27017/Looking';
    let db, result;
    try{
        db = await mongoClient.connect(url);
        var studentListTable = await db.db("Looking").collection("studentList");

        result = await studentListTable.findOne({tid :tid,ctime:ctime,place:place,cid:cid});
        // console.log(result);
        var i;
        var sidList = [];
        for(i=0;i<result.sid.length;i++)
        {
            sidList.push(result.sid[i]);
        }
        var studentlist = [];
        for(i=0;i<sidList.length;i++)
        {
            studentlist.push(await studentDao.getStudentInfo(sidList[i]));
        }
        console.log(studentlist);
        db.close();
        return studentlist;


    }catch(e){
        console.error(e.message);
    }

};

exports.getStudentsSid = async function(tid,ctime,place,cid){             //根据课程信息返回一个签到记录表
    /*
    * @param tid  teacher tid
    * return  course 的详细信息
    * */
    var url = 'mongodb://localhost:27017/Looking';
    let db, result;
    try{
        db = await mongoClient.connect(url);
        var studentListTable = await db.db("Looking").collection("studentList");

        result = await studentListTable.findOne({tid :tid,ctime:ctime,place:place,cid:cid});
        console.log(result);
        console.log("1111111");
        var i;
        var sidList = [];
        for(i=0;i<result.sid.length;i++)
        {
            sidList.push(result.sid[i]);
        }
        db.close();
        console.log(sidList)
        return sidList;


    }catch(e){
        console.error(e.message);
    }

};


