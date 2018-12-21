var async = require('async');
var mongoClient = require('mongodb').MongoClient;
exports.query = async function(tid,pwd){
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
            if(result == null)
            {
                index = 0;
            }
            else{
                if(result.pwd != pwd)
                {
                    index = 1;
                }
                else if(result.pwd === pwd)
                {
                    index = 2;
                }
                else{
                    index =  -1;
                }
            }
        }catch(e){
            console.error(e.message);
        }

        return index;
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
        var info = {tid:result.tid,tname:result.tname,phone:result.phone};
        // console.log(result);
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





exports.modify =   async function (tid, tname, pwd) {
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