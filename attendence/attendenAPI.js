var http = require('http');
// const images = require('images');
const fs = require('fs');
const path = require('path');
const mineType = require('mime-types');
const https = require('https');
const querystring = require('querystring');

// var studentImage = images("./studentImage/916106840622.jpg")                     //Load studentImage from file
//加载图像文件
//     .size(800);
exports.getImgUrl = function(rootDir){      //获取学生图片url

          var root_path=process.argv[2];
           var res = [] , files = fs.readdirSync(rootDir);
           files.forEach(function(file){

           var pathname = rootDir+'/'+file, stat = fs.lstatSync(pathname);

           if (!stat.isDirectory()){
                    res.push(pathname.replace(root_path,'.'));
                   } else {
                    res = res.concat(getAllFiles(pathname));
                 }
               });
          return res

}

exports.detect = function(img_url){
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


    const req = https.request(options, (res) => {
        // console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);
        res.on('data', (d) => {
            // console.log('' + d);//将buffer转为字符串或者使用d.toString()
            let b = JSON.parse('' + d);
            //将buffer转成JSON
            console.log(b);
        });
    });
    req.on('error', (e) => {
        console.error(e);
    });
    req.write(data);
    req.end();
}

exports.detects = async function (img_url) {
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

    var face_tokens = [];
    const req = await https.request(options,(res) => {
        // console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);
        res.on('data', (d) => {
            // console.log('' + d);//将buffer转为字符串或者使用d.toString()
            let b = JSON.parse('' + d);
            //将buffer转成JSON

            for (var i = 0; i < faces.length; i++) {
                face_tokens.push(b.faces[0].face_token);
            }
        });
    });
    req.on('error', (e) => {
        console.error(e);
    });
    console.log()
}