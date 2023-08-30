/**
 * Created by Walker on 2020/04/30.
 * 服务器入口文件
 * 热加载 supervisor server.js
 */
const express = require("express");
const app = express();
var url = require("url");
var bodyParser = require("body-parser"); //格式化请求消息的中间件
const db = require("./db/db.js");
const dayjs=require('dayjs')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//设置允许跨域的域名，*代表允许任意域名跨域
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //允许的header类型
    res.header("Access-Control-Allow-Headers", "Content-type"); //跨域允许的请求方式
    res.header(
        "Access-Control-Allow-Methods",
        "PUT,POST,GET,DELETE,OPTIONS,PATCH"
    ); //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
    res.header("Access-Control-Max-Age", 1728000); //预请求缓存20天
    next();
});

//下面是一些供前端使用的测试接口；
//get和post方法，对从前端接收的请求data的处理会有区别，可以注意一下；
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/index_getdata", (req, res) => {
    var name = url.parse(req.url, true).query;
    console.log(name);
});

app.post("/add", (req, res, next) => {
    let body = req.body;
    console.log("dbAdd", req.body);
    let sqlParam = {
        id: body.uuid,
        name: body.name,
    };
    console.log("dbAdd", sqlParam);
    db.dbAdd("login", sqlParam, res, next);
});

app.post("/delete_data", (req, res, next) => {
    let body = req.body;
    console.log("delet", req.body);
    let sqlParam = {
        id: body.uuid,
    };
    console.log("delet", sqlParam);
    db.dbDelete("login", sqlParam, res, next);
});

app.post("/update_data", (req, res, next) => {
    let body = req.body;
    console.log("update", req.body);
    let sqlParam = {
        name: body.name,
        id: body.uuid,
    };
    console.log("update", sqlParam);
    db.dbUpdate("login", sqlParam, res, next);
});

app.post("/queryById_data", (req, res, next) => {
    let body = req.body;
    console.log("queryById_data", req.body);
    let sqlParam = {
        id: body.uuid,
    };
    console.log("queryById_data", sqlParam);
    db.dbQueryById("login", sqlParam, res, next);
});

app.get("/queryAll_data", (req, res, next) => {
    db.dbQueryAll("memorandum", "", res, next);
});


// 登录验证
app.get("/validate_login", (req, res,next) => {
    const params = url.parse(req.url, true).query;
    db.dbQueryByUserName("login", params.username, res, next);
});
app.get("/memorandum_getAll", (req, res, next) => {
    db.dbQueryAll("memorandum", "", res, next);
});
app.post("/memorandum_add", (req, res, next) => {
    let body = req.body;
    let shortTitle = body.shortTitle.replace(/\n/g, '');
    let sqlParam = {
        message: body.message,
        user:'1',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        shortTitle:shortTitle,
    };
    db.dbAdd("memorandum", sqlParam, res, next);
});

app.listen(3333, () => console.log("Example app listening on port 3333!"));

