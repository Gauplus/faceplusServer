var http = require('http');
// const images = require('images');
const fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
const path = require('path');
const mineType = require('mime-types');
const https = require('https');
const querystring = require('querystring');
const promise = require('es6-promise');
const studentDao = require('../controllers/studentDao');
const studentListDao = require('../controllers/studentListDao');
const recordDao = require("../controllers/recordDao")
exports.detect = async function (img_url) {          //返回face_token的集合
    let bitmap = fs.readFileSync(img_url);
    let base64str = Buffer.from(bitmap, 'binary').toString('base64');


    var data = querystring.stringify({
        api_key: "2eUS6nEMoyY6FQWH78TSyjsMtmQrJsla",
        api_secret: "QkC_P5WsmcQQOC9i_JBW0MhV4tIcUaqx",
        image_base64: base64str//图片地址，接口支持base64,图片地址和imagefile
    })
    const options = {
        host: 'api-cn.faceplusplus.com',
        path: '/facepp/v3/detect',
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    };

    const faceset = await new Promise((resolve) => {
        const req =  https.request(options, (res) => {
            res.on('data',(async (d) => {
                let b = JSON.parse('' + d);
                //将buffer转成JSON
                var faceset = [];
                for(var i=0;i<b.faces.length;i++)
                {
                    faceset.push(b.faces[i].face_token);
                }
                return resolve(faceset);
            }))

        });
        req.on('error', (e) => {
            console.error(e);
        });
        req.write(data);
        req.end();
    });
    return faceset;

};

exports.compare = async function (face_token1,face_token2) {          //返回face_token
    var data = querystring.stringify({
        api_key: "2eUS6nEMoyY6FQWH78TSyjsMtmQrJsla",
        api_secret: "QkC_P5WsmcQQOC9i_JBW0MhV4tIcUaqx",
        face_token1: face_token1.toString(),
        face_token2:face_token2.toString()
    })
    const options = {
        host: 'api-cn.faceplusplus.com',
        path: '/facepp/v3/compare',
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    };

    const result = await new Promise((resolve) => {
        const req =  https.request(options, (res) => {
            res.on('data',(d) => {
                let b = JSON.parse('' + d);
                //将buffer转成JSON
                return resolve(b);
            })

        });
        req.on('error', (e) => {
            console.error(e);
        });
        req.write(data);
        req.end();
    });
  console.log(result);

};

exports.attendent = async function (tid,ctime,cid,place) {
    gm('./image/class.jpg')
        .resize(1024, 1024)
    var faces = await this.detect('./image/class.jpg');       //返回图片上的所有人脸token
    var sfaces = []  //存储所有学生的token  用于和faces做对比
    var here = []; //来了的
    var nothere = [] //没来的

    var studentList = await studentListDao.getStudentsSid(tid,ctime,place,cid);//获取该门所有学生
    var urls = []
    for(let sid of studentList)
    {
        var url =await studentDao.getStudentUrl(sid);
        var temp = {
            sid:sid,
            url:"../"+url
        }
        urls.push(temp);
    }
   // console.log(urls);
    var token;
    for(let url of urls)
    {
        var temp = await this.detect(url.url);  //获取学生的token
        token = {
            sid:url.sid,
            token:temp[0]
        }
        sfaces.push(token);
    }

    for(let face1 of faces) {
        for (let face2 of sfaces){
            var result = await this.compare(face1,face2.token)
            if(result.confidence>50)
            {
                here.push(face2.sid);
            }
        }
    }
    for(let sid of here){
        recordDao.insertHere(sid)
    }
   return recordDao.query(cid,tid,ctime,place)
}