//api接口地址
//base url for China
var bodyParser = require('body-parser');
var atob = require('atob');

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var jQuery = require('jquery')(window);




const FACE_HOST_CN = "https://api-cn.faceplusplus.com/";

const FACE_FACEPP = "facepp/v3/";
const FACE_DETECT = FACE_FACEPP + "detect";
const FACE_COMPARE = FACE_FACEPP + "compare";
const FACE_SEARCH = FACE_FACEPP + "search";

// facetoken
const FACETOEKN = FACE_FACEPP + "face/";
const FACETOEKN_ANALYZE = FACETOEKN + "analyze";
const FACETOEKN_SET_USERID = FACETOEKN + "setuserid";
const FACETOEKN_GET_DETAIL = FACETOEKN + "getdetail";

//faceSet
const FACESET = FACE_FACEPP + "faceset/";
const FACESET_CREATE = FACESET + "create";
const FACESET_ADDFACE = FACESET + "addface";
const FACESET_REMOVE_FACE = FACESET + "removeface";
const FACESET_ADDFACE_ASYNC = FACESET + "async/addface";
const FACESET_REMOVE_FACE_ASYNC = FACESET + "async/removeface";
const FACEAET_TASK_QUERY = FACESET + "async/task_status";
const FACESET_UPDATE = FACESET + "update";
const FACESET_GET_DETAIL = FACESET + "getdetail";
const FACESET_GET_FACESETS = FACESET + "getfacesets";
const FACESET_DELETE = FACESET + "delete";


//人体检测和人体抠图
const HUMANBODY_DETECT = "humanbodypp/v1/detect";
const HUMANBODY_SEGMENT = "humanbodypp/v2/segment";
const HUMANBODY_SKELETON = "humanbodypp/v1/skeleton";
const HUMANBODY_GESTURE = "humanbodypp/beta/gesture";

let apikey = '2eUS6nEMoyY6FQWH78TSyjsMtmQrJsla';
let apisecret = 'QkC_P5WsmcQQOC9i_JBW0MhV4tIcUaqx';



/* FACEPP对象
 *  apikey : 填写apikey
 *  apisecret : 填写 apisecret
 *  isChina : 是否是国内用户
 */
    //人脸检测
    exports.detectFace = function (param, success, failed) {

        var url = FACE_HOST_CN + FACE_DETECT;
        this.request(url, param, success, failed);
    };

    exports.dataURItoBlob = function(dataURI) { // 图片转成Buffer

        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
    }
    //人脸比对
    exports.compareFace = function (param, success, failed) {
        var url = FACE_HOST_CN + FACE_COMPARE;
        this.request(url, param, success, failed);
    };

    //**************对faceset(人脸集合)的操作***************

    // 创建faceset
    exports.faceSetCreate = function (param, success, failed) {
        var url = FACE_HOST_CN + FACESET_CREATE;
        this.request(url, param, success, failed);
    };

    // 删除faceset
    exports.faceSetdelete = function (param, success, failed) {
        var url = FACE_HOST_CN + FACESET_DELETE;
        this.request(url, param, success, failed);
    };

    //faceset 更新
    exports.faceSetUpdate = function (param, success, failed) {
        var url = FACE_HOST_CN + FACESET_UPDATE;
        this.request(url, param, success, failed);
    };

    // 查询指定的faceset
   exports.faceSetQuery = function (param, success, failed) {
        var url = FACE_HOST_CN + FACESET_GET_DETAIL;
        this.request(url, param, success, failed);
    };

    // 获取所有的faceset
    exports.faceSetGetAll = function (param, success, failed) {
        var url = FACE_HOST_CN + FACESET_GET_FACESETS;
        this.request(url, param, success, failed);
    };


    //**************管理指定faceset内的人脸***************

    //人脸搜索,根据相似度搜索人脸
    exports.faceSearch = function (param, success, failed) {
        var url = FACE_HOST_CN + FACE_SEARCH;
        this.request(url, param, success, failed);
    };

    // 添加人脸到指定faceset
    exports.faceAdd = function (param, success, failed) {
        var url = FACE_HOST_CN + FACESET_ADDFACE;
        this.request(url, param, success, failed);
    };

    // 删除指定faceset中的某个人脸
    exports.faceDelete = function (param, success, failed) {
        var url = FACE_HOST_CN + FACESET_REMOVE_FACE;
        this.request(url, param, success, failed);
    };

    // 异步添加人脸到指定faceset
    exports.faceAddAsnc = function (param, success, failed) {
        var url = FACE_HOST_CN + FACESET_ADDFACE_ASYNC;
        this.request(url, param, success, failed);
    };

    // 异步删除指定faceset中的某个人脸
    exports.faceDelete = function (param, success, failed) {
        var url = FACE_HOST_CN + FACESET_REMOVE_FACE_ASYNC;
        this.request(url, param, success, failed);
    };

    // 异步任务状态查询
    exports.asyncStatus = function (param, success, failed) {
        var url = FACE_HOST_CN + FACEAET_TASK_QUERY;
        this.request(url, param, success, failed);
    };

    //**************对facetoken(人脸标识)的操作***************
    // 设置userid
    exports.facetokenSetUserID = function (param, success, failed) {
        var url = FACE_HOST_CN + FACETOEKN_SET_USERID;
        this.request(url, param, success, failed);
    };

    //获取facetoken的本身的详细信息
   exports.facetokenGetDetail = function (param, success, failed) {
        var url = FACE_HOST_CN + FACETOEKN_GET_DETAIL;
        this.request(url, param, success, failed);
    };

    //根据facetoken获取人脸信息
   exports.facetokenAnalyze = function (param, success, failed) {
        var url = FACE_HOST_CN + FACETOEKN_ANALYZE;
        this.request(url, param, success, failed);
    };



    //**************人体识别相关***************
    //人体检测
    exports.bodyDetect = function (param, success, failed) {
        var url = FACE_HOST_CN + HUMANBODY_DETECT;
        this.request(url, param, success, failed);
    };

    //人体关键点检测
    exports.skeletonDetect = function (param, success, failed) {
        var url = FACE_HOST_CN + HUMANBODY_SKELETON;
        this.request(url, param, success, failed);
    };



    /* POST请求
     * url: 请求地址
     * 请求携带的参数
     */
    exports.request = function (url, dic, success, failed) {//发送POST请求

        var formData = new window.FormData();

        formData.append('api_key', apikey);
        formData.append('api_secret', apisecret);

        for (var key in dic) {//遍历拼接
            formData.append(key, dic[key]);
        }

        jQuery.ajax({
            url: url,
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            timeout: 20000,//20秒超时时间
        }).done(success).fail(failed);
};
