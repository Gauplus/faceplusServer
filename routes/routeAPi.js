let api = require('../controllers/api');
module.exports = function (app) {

    app.route('/login')      //finish
    // .get(total.render)
        .post(api.login);


    app.route('/register')    //注册 finish
        .post(api.register);


    app.route('/getTeacherInfo')  //获取教师信息 finish
        .get(api.getTeacherInfo);


    app.route('/modifyTeacherInfo')   //modify the teacher's information finish
        .post(api.modifyTeacherInfo)


    app.route('/getCourses')       //get all the courses of the teacher  finish
        .get(api.getCourses);

    app.route('/getStudentList')  // get the students of this class
        .get(api.getStudentList)


    app.route('/getRecords')       //get  attendence records about this time
        .get(api.getRecords);


    app.route('/attendence')    //attendence
        .post(api.attendence);


};
