const express = require('express');
const process = require('./process');

const router = express.Router();

//1.静态页面
router.get('/', (request, response) => {
    process.getIndex(request, response);
});
//2.1跳转到添加页面
router.get('/add', (request, response) => {
    process.add(request, response);
});
//2.2 操作-添加
router.post('/add', (request, response) => {
    process.postAdd(request, response);
});

//3.删除
router.get('/delete', (request, response) => {
    process.delete(request, response);
});

//4.1跳转到修改页面 并渲染当前需要修改的对象的数据
router.get('/edit', (request, response) => {
    process.edit(request, response);
});

//4.2操作-修改
router.post('/edit', (request, response) => {
    process.postEdit(request, response);
});

//5.批量删除
router.get('/lotsDelete', (request, response) => {
    process.lotsDelete(request, response);
});

//暴露
module.exports = router;