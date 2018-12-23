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
        // console.log("haha")
        var studentInfo ={
            sid:result.sid,
            sname:result.sname
        };

        db.close();
        return studentInfo;
    }catch(e){
        console.error(e.message);
    }

};



