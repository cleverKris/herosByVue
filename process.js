//引入数据库
const mysql = require('./db');

const fs = require('fs');
const path = require('path');
const query = require('querystring');

const formidabel = require('formidable');


//1.静态页面
module.exports.getIndex = (request, response) => {

    //1.使用sql查询语句
    mysql.query('SELECT * FROM herosUp', function (err, results) {
        // //console.log(results);//拿到的是一个数组 里面装着多个对象
        // response.render('index', {herosUp: results});   //因为在html中的模板 是使用{{each heros}}


        //--------------------在线版vue增删改查-----------------------------
        response.set('Access-Control-Allow-Origin', '*');  //解决跨域
        if (err) {
            return response.send({
                status: 400,
                msg: '出错啦'
            })
        }

        response.send({
            status: 200,
            data: results
        })
    })
};


//2.1 跳转到添加页面
module.exports.add = (request, response) => {
    response.render('add', {});
};

//2.2 添加-操作
module.exports.postAdd = (request, response) => {
    //在数据库中添加的sql语句是:
    //INSERT INTO hero (name,gender,img) VALUES ('','','')  里面是传递过来的参数


    //方法2:使用第三方包formidabel(中间件)
    //1.引入第三方模块formidabel
    //2.创建formidable对象
    const form = new formidabel.IncomingForm();
    //3.调用parse方法
    //参数1:request:请求对象
    form.parse(request, (err, fields) => {
        // console.log(fields);//提交的字段(接收参数)  直接成为一个对象
        // console.log(files);//上传过来的文件集合

        // if (err) return;
        // console.log(fields); //{ name: '小哥哥', gender: '男', img: '0.jpg' }
        //
        // var keyStr = '';//(name,gender,img)
        // var valueStr = '';//
        // for (var key in fields) {
        //     keyStr += key + ','; //name,gender,img,
        //
        // }
        // keyStr = keyStr.substr(0, keyStr.length - 1);
        // console.log(keyStr); ////name,gender,img


        fields.img = 'views/img/3.jpg';
        let strSql = `INSERT INTO herosUp (name,gender,img) VALUES ('${fields.name}','${fields.gender}','${fields.img}')`;
        mysql.query(strSql, (err, result) => {
            response.set('Access-Control-Allow-Origin', '*');  //解决跨域
            if (err) {
                return response.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            response.send({
                status: 200,
                msg: '添加成功'
            })
        });
        //response.redirect('/');
    });

};


//3.删除
module.exports.delete = (request, response) => {
    //删除的sql语句是: DELETE FROM hero WHERE id = x
    let id = request.query.id; //1
    //console.log(id);
    let strSql = `DELETE FROM herosUp WHERE id = ${id}`;
    mysql.query(strSql, (err, result) => {
        response.set('Access-Control-Allow-Origin', '*');  //解决跨域
        if (err) {
            return response.send({
                status: 400,
                msg: '删除失败'
            })
        }
        response.send({
            status: 200,
            msg: '删除成功'
        })
    });

    // response.redirect('/');
};

//4.1跳转到修改页面 并渲染当前需要修改的对象的信息
module.exports.edit = (request, response) => {
    //拿到当前需要修改的id
    let id = request.query.id;
    //查询的sql语句:SELECT * FROM hero WHERE id = x
    let strSql = `SELECT * FROM herosUp WHERE id = ${id}`;
    mysql.query(strSql, results => {
        //console.log(results);//[ RowDataPacket { id: 2, name: '貂蝉', gender: '女', img: 'views/img/1.jpg' } ]
        var obj = results[0];//{ id: 2, name: '貂蝉', gender: '女', img: 'views/img/1.jpg' }
        response.render('edit', obj);
    });
};

//4.2操作-修改
module.exports.postEdit = (request, response) => {
    //修改的sql语句:UPDATE hero SET name='',gender='',img='', WHERE id = x


    //使用formidabel来接收请求的参数
    //创建一个formidabel对象
    const form = new formidabel.IncomingForm();
    form.parse(request, (err, fields, files) => {
        if (err) return;
        //console.log(fields); //要修改提交的数据 { id: '2', name: '小哥哥', gender: '男', img: '2.jpg' }

        let ImgUrl = 'views/img/';
        fields.img = ImgUrl + fields.img;

        let strSql = `UPDATE herosUp SET name='${fields.name}',gender='${fields.gender}',img='${fields.img}' WHERE id = ${fields.id}`;
        mysql.query(strSql, () => console.log('修改成功'));

        //跳转到主页
        response.redirect('/');
    });
};


//5.批量删除
module.exports.lotsDelete = (request, response) => {
    //删除的sql语句是: DELETE FROM heroUp WHERE id in(1,2,3,4,5,6) //删除id为1,2,3,4,5,6的这6条数据

    //1.此时的url是:http://localhost:3000/lotsDelete?1,2,3
    // console.log(request.query); //{ '2,3': '' }

    //2.比较严谨的地址应该是:http://localhost:3000/lotsDelete?id=1&id=2&id=3
    //console.log(request.query); //{ 'id ': ' 2 ', ' id ': ' 3' }
    let idObj = request.query;
    let idStr = '';
    for (var key in idObj) {
        idStr += idObj[key] + ',';
    }
    //console.log(idStr); // 2 , 3 , 4,
    idStr = idStr.substr(0, idStr.length - 1);
    //console.log(idStr); // 2 , 3 , 4

    mysql.query(` DELETE FROM herosUp WHERE id in(${idStr})`, () => console.log('删除成功'));
    response.redirect('/');

};