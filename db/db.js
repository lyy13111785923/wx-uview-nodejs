/**
 * Created by Walker on 2020/05/06.
 * 数据库增、删、改、查封装
 */
//mysql连接池配置文件
const mysql = require("mysql");
const $dbConfig = require("./dbConfig"); //注意改成自己项目中mysql配置文件的路径
const sql = require("./sql.js"); //sql语句封装
// modules
const loginSql=require('./modules/login.js')
// pool
const pool = mysql.createPool($dbConfig); // 使用连接池，避免开太多的线程，提升性能
const json = require("./json");

/**
 * @description 新增一条数据
 * @param  {str} table 数据库表的名称
 * @param  {obj} req 插入的数据
 * @param  {obj} res 接口函数中的res对象
 * @param  {obj} next 接口函数中的next对象
 */
let dbAdd = (table, req, res, next) => {
    pool.getConnection((err, connection) => {
        let paramValue = paramList(req);
        connection.query(sql[table].insert, [...paramValue], (err, result) => {
            if (result) {
                result = "add";
            }
            // 以json形式，把操作结果返回给前台页面
            json(res, result, err);
            // 释放连接
            connection.release();
        });
    });
};

/**
 *@description 删除一条数据
 @param 同abAdd
 */
let dbDelete = (table, req, res, next) => {
    let paramValue = paramList(req);
    pool.getConnection((err, connection) => {
        connection.query(sql[table].delete, [...paramValue], (err, result) => {
            if (result.affectedRows > 0) {
                result = "delete";
            } else {
                result = undefined;
            }
            json(res, result, err);
            connection.release();
        });
    });
};

/**
 *@description 修改一条数据
 @param 同abAdd
 */
let dbUpdate = (table, req, res, next) => {
    let paramValue = paramList(req);
    pool.getConnection((err, connection) => {
        connection.query(sql[table].update, [...paramValue], (err, result) => {
            console.log(result)
            if (result.affectedRows > 0) {
                result = "update";
            } else {
                result = undefined;
            }
            json(res, result, err);
            connection.release();
        });
    });
};

/**
 *@description 查找一条数据
 @param 同abAdd
 */
let dbQueryById = (table, req, res, next) => {
    let paramValue = paramList(req);
    pool.getConnection((err, connection) => {
        connection.query(sql[table].queryById, [...paramValue], (err, result) => {
            if (result != "") {
                var _result = result;
                result = {
                    result: "select",
                    data: _result,
                };
            } else {
                result = undefined;
            }
            json(res, result, err);
            connection.release();
        });
    });
};

/**
 *@description 查找一条数据
 @param 同abAdd
 */
let dbQueryByUserName = (table, req, res, next) => {
    pool.getConnection((err, connection) => {
        connection.query(sql[table].queryByUserName, req, (err, result) => {
            if (result != "") {
                var _result = result;
                result = {
                    result: "select",
                    data: _result,
                };
            } else {
                result = undefined;
            }
            json(res, result, err);
            connection.release();
        });
    });
};

/**
 *@description 查找全部数据
 @param 同abAdd
 */
let dbQueryAll = (table, req, res, next) => {
    pool.getConnection((err, connection) => {
        connection.query(sql[table].queryAll, (err, result) => {
            if (result != "") {
                var _result = result;
                result = {
                    result: "selectall",
                    data: _result,
                };
            } else {
                result = undefined;
            }
            json(res, result, err);
            connection.release();
        });
    });
};

/**
 * @description 遍历数据的值
 * @param {obj} obj 包含参数的对象
 * */
let paramList = (obj) => {
    let paramArr = [];
    for (let key in obj) {
        if (obj[key]) {
            paramArr.push(obj[key]);
        }
    }
    return paramArr;
};

module.exports = {
    dbAdd,
    dbDelete,
    dbUpdate,
    dbQueryById,
    dbQueryByUserName,
    dbQueryAll,
};

