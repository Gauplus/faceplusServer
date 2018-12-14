var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 声明一个数据集 对象
var teacherSchema = new Schema({
    tid :{
        type:String
    },
    tname: {
        type: String
    },
    password: {
        type: String
    }
});
// 将数据模型暴露出去
module.exports = mongoose.model('teacher', teacherSchema);