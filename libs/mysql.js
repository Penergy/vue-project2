/* 
nodejs连接mysql数据库支持事物封装 
 */
var mysql = require('mysql');
var config = require('../configs/config.js')
var pool = mysql.createPool(config.db);

var query = function (sql, options, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, options, function (err, results, fields) {
                //释放连接  
                conn.release();
                //事件驱动回调  
                callback(err, results, fields);
            });
        }
    });
};

module.exports = query;  