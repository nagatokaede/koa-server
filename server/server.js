'use static';

const { PORT } = require('./config');

const koa = require('koa');
const koaBody = require('koa-body');
const path = require('path');

const logger = require('../middleware/logger');
const router = require('../middleware/router');
const access = require('../middleware/access');

const app = new koa();

app.use(logger);

app.use(access(['admin']));

app.use(koaBody({
  multipart: true, // 开启文件上传
  formidable: {
    uploadDir: path.join(__dirname,'../public/upload/'), // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 20 * 1024 * 1024, // 文件上传大小
  },
}));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);
console.info('server run http://localhost:' + PORT);
