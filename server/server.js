'use Static';

const { PORT } = require('./config');

const koa = require('koa');
const koaBody = require('koa-body');
const path = require('path');
const Static = require('koa-static');

const logger = require('../middleware/logger');
const router = require('../middleware/router');
const access = require('../middleware/access');
const { mkdir } = require('../util/fs');

const app = new koa();

app.use(logger);

app.use(access(['admin']));

app.use(koaBody({
  multipart: true,
  formidable: {
    keepExtensions: true,
    onFileBegin: (name, file) => { // 文件上传前的设置
      const date = new Date().toLocaleString('zh').split(' ')[0].replace(/-/g, '');
      const dirname = path.join(__dirname, '../public/upload/', date);
      // 创建目录
      mkdir(dirname);
      // 修改保存地址
      file.path = path.join(dirname, file.name);

      console.info('FileBegin: ', new Date().getTime());
    },
  },
  onError: err => {
    console.warn(err);
  }
}));

app.use(router.routes());
app.use(router.allowedMethods());

app.use(Static(path.join(__dirname, '../public/')));

app.listen(PORT);
console.info('server run http://localhost:' + PORT);
