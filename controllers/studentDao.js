var async = require('async');
var mongoClient = require('mongodb').MongoClient;


exports.getStudentInfo= async function(sid){
    /*
    * @param sid
    * return  info 的详细信息
    * */
    var url = 'mongodb://localhost:27017/Looking';
    let db, result;
    try{
        db = await mongoClient.connect(url);
        var studentListTable = await db.db("Looking").collection("student");
        result = await studentListTable.findOne({sid:sid});

        var studentInfo ={
            sid:result.sid,
            sname:result.sname,
            url : result.pic
        };

        db.close();
        return studentInfo;
    }catch(e){
        console.error(e.message);
    }

};


exports.getStudentUrl= async function(sid){
    /*
    * @param sid
    * return  info 的详细信息
    * */
    var url = 'mongodb://localhost:27017/Looking';
    let db, result;
    try{
        db = await mongoClient.connect(url);
        var studentListTable = await db.db("Looking").collection("student");
        result = await studentListTable.findOne({sid:sid});

        var surl = result.pic;

        db.close();
        return surl;
    }catch(e){
        console.error(e.message);
    }

};


