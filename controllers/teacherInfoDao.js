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
            db = await mongoClient.connect(url,{ useNewUrlParser: true } );
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
    db.close();
        return index;
    };

exports.getTeacherInfo = async function(tid){          //根据tid获取教师信息
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
        db = await mongoClient.connect(url,{ useNewUrlParser: true } );
        var teacherTable = await db.db("Looking").collection("teacher");
        result = await teacherTable.findOne({tid :tid});
        // console.log(result);
        var info = {tid:result.tid,btime:result.btime,tname:result.tname,phone:result.tel,kname:result.kname,gender:result.sex,fac:result.fac};
        // console.log(result);
        db.close();
        return info;
    }catch(e){
        console.error(e.message);
    }


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
        db.close();
        return index;
    } catch (e) {
        console.log(e.message);
    }
};





exports.update =   async function (tid, tname,kname,gender,birth,fac) {
    /*
    *
    */

    var url = 'mongodb://localhost:27017/Looking';
    let db, result;
    try {

        db = await mongoClient.connect(url);
        var teacherTable = await db.db("Looking").collection("teacher");
        var temp2 = await teacherTable.updateOne({tid: tid},{$set:{tname:tname,kname:kname,sex:gender,btime:birth,fac:fac}});
        var temp = await this.getTeacherInfo(tid);
        result = {
            tid:temp.tid,
            tname:temp.tname,
            tel : temp.phone,
            kname:temp.kname,
            birth :temp.btime,
            gender:temp.gender,
            fac :temp.fac
        }
        // console.log(temp);
        console.log(result);
        return result;
        db.close();
    } catch (e) {
        console.log(e.message);
        return "error";
    }
};
//
// exports.delete =   async function (tid, tname, pwd) {   //暂时用不到
//     /*
//
//     */
//
// };