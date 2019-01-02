var request = require('request');
const querystring = require('querystring');
//exports.httprequest = (requestData) =>{
const fs = require('fs');
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

function httprequest(requestData){
    return new Promise((resolve, reject)=>{


        const options = {
            host: 'api-cn.faceplusplus.com',
            path: '/facepp/v3/detect',
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        };
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            }
        });
    });

};
let bitmap = fs.readFileSync("./studentImage/916106840331.jpg");
let base64str = Buffer.from(bitmap, 'binary').toString('base64');

var data = querystring.stringify({
    api_key: "2eUS6nEMoyY6FQWH78TSyjsMtmQrJsla",
    api_secret: "QkC_P5WsmcQQOC9i_JBW0MhV4tIcUaqx",
    image_base64: base64str//图片地址，接口支持base64,图片地址和imagefile
})
httprequest(data).then(function(req){
    console.log(req)
})