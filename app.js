//开启服务器
const express = require('express');
const expressTmp = require('express-art-template');

const router = require('./router');

const app = express();

//配置
app.set('view engine', 'html');
app.engine('html', expressTmp);

//统一处理静态资源
app.use('/node_modules', express.static('node_modules'));
app.use('/views', express.static('views'));

//使用外置路由
app.use(router);


app.listen('3000', () => {
    console.log('running...');
});