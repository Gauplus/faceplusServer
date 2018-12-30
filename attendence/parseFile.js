// const http = require('http');
// const url = require('url');
// const fs = require('fs');
// const util = require('util');
//
// const formidable = require('formidable')
//
// const form = new formidable.IncomingForm(); ///创建传入表单
// form.encoding = 'utf-8'
// form.uploadDir = "./temp"      // 设置放置文件上传的目录
//
// // requestListener 函数
// function upload (req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*')       // 解决跨域
//
//     // 匹配前端表单 action 的指向地址
//
//
//
//
//         // 引入 npm 包 formidable 处理表单数据
//         form.parse(req, (error, fields, files) => {
//
//             for (let key in files) {
//                 let file = files[key]
//                 // 过滤空文件
//                 if (file.size == 0 && file.name == '') continue
//
//                 let fileType = file.type.split('/')[1],
//                     oldPath = file.path,
//                     newPath = 'img/' + Date.now() + Math.random() + '.' + fileType
//
//                 fs.rename(oldPath, newPath, (error) => {
//                     if (error) throw error
//
//                     console.info('done')
//                 })
//
//
//             // 筛选文件
//             obj = util.inspect({fields: fields, files: files})
//
//             console.info('==post obj==', obj)
//
//             res.writeHead(200, {
//                 "Content-Type": "text/html;charset=utf-8"
//             })
//             res.end(JSON.stringify(data))
//         }
// }