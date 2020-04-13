'use static';

const { PORT } = require('./config');

const koa = require('koa');
const koaBody = require('koa-body');
const path = require('path');
const static = require('koa-static');

const logger = require('../middleware/logger');
const router = require('../middleware/router');
const access = require('../middleware/access');
const { mkdir } = require('../util/fs');

const app = new koa();

app.use(logger);

app.use(access(['admin']));

app.use(static(path.join(__dirname, '../public/')));

app.use(koaBody({
  multipart: true, // 开启文件上传
  formidable: {
    // uploadDir: path.join(__dirname,'../public/upload/'), // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    // maxFieldsSize: 2 * 1024 * 1024, // 限制所有字段（文件除外）可以分配的内存总量
    onFileBegin: (name, file) => {
      const date = new Date().toLocaleString('zh').split(' ')[0].replace(/-/g, '');
      const dirname = path.join(__dirname, '../public/upload/', date);
      // 创建目录
      mkdir(dirname);
      // 修改保存地址
      file.path = path.join(dirname, file.name);
    },
    onError: err => {
      console.warn(err);
    }
  },
}));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);
console.info('server run http://localhost:' + PORT);
