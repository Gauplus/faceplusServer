var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    var ls = {"name":"高正"}
    var jsonStr = JSON.stringify(ls);   // JS对象到JSON字符串
    res.send(jsonStr);
})
module.exports = router;