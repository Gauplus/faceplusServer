# faceplusServer
##      人脸签到的服务端

##  eg: http://localhost:3000/login  use the post method
##  eg: http://localhost:3000/getTeacherInfo  use the get method
##
##  API  ##
#####   app.route('/login')          
#####        .post(api.login);

#####   /*  param  id       teacher id
#####       param  password 
#####       return "OK"     sucess  
#####              "null"   not register yet  
#####              "error"  id or pwd error
#####   */



#####    app.route('/register')    //注册 finish
#####        .post(api.register);


#####    app.route('/getTeacherInfo')  //获取教师信息 finish
#####        .get(api.getTeacherInfo);


#####    app.route('/modifyTeacherInfo')   //modify the teacher's information finish
#####        .post(api.modifyTeacherInfo)


#####    app.route('/getCourses')       //get all the courses of the teacher  finish
#####        .get(api.getCourses);

#####    app.route('/getStudentList')  // get the students of this class finish
#####        .get(api.getStudentList)


#####    app.route('/getRecords')       //get  attendence records about this time finish
#####        .get(api.getRecords);


#####    app.route('/attendence')    //attendence
#####        .post(api.attendence);

