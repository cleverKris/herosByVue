// 由于增删改查都是相同的代码，所有我们考虑将代码进行封装

//1.引入第三方包 mysql
const mysql = require('mysql');
//2.创建一个连接通道
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'heros'  //要查询的数据库名
});

//3.开启连接
connection.connect();


module.exports.query = function (strSql, callback) {
    //4.执行sql语句
    connection.query(strSql, (err, results) => {
        if (err) {
            return callback(err, null)
        }
        // 将结果返回给外界,不建议使用 return 关键字,因为此处return返回值是给query方法的回调函数的,外界是访问不到的
        // 可以使用一个函数:回调函数来使用
        callback(null, results);

        /*
        * 模拟外界调用
        * function(results){}就是callback
        * sqlApi(要执行增删改查的sql语句,function(results){
        *       console.log(results)
        * })
        *
        * */
    });


    //5.关闭连接
    // connection.end();
};