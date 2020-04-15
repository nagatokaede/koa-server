'use Static';

const { PORT } = require('./config');

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const Static = require('koa-static');
const Busboy = require('busboy');
const inspect = require('util').inspect;
const fs = require('fs');

const logger = require('../middleware/logger');
const router = require('../middleware/router');
const access = require('../middleware/access');
const { mkdir } = require('../util/fs');

const app = new koa();

app.use(logger);

app.use(access(['admin', 'upload'], '60m'));

const upload = ctx => {
  return new Promise((resolve, reject) => {
    const req = ctx.req;
    const busboy = new Busboy({ headers: req.headers });

    const date = new Date().toLocaleString('zh').split(' ')[0].replace(/-/g, '');
    const dirname = path.join(__dirname, '../public/upload/', date);

    // 创建目录
    mkdir(dirname);
    console.info('upload', 'mkdir');

    busboy.on('file', function(fieldName, file, filename, encoding, mimetype) {
      console.log(`File [${fieldName}]: filename: ${filename}`);

      const filePath = path.join(dirname, filename);
      console.info(filePath);

      // 将地址传入上下文
      if (!ctx.request.files) ctx.request.files = {};
      ctx.request.files[fieldName] = filePath;

      console.info(ctx.request.files);

      // 文件保存到特定路径
      file.pipe(fs.createWriteStream(filePath));

      // 开始解析文件流
      file.on('data', function(data) {
        console.log(`File [${fieldName}] got ${data.length} bytes`);
      });

      // 解析文件结束
      file.on('end', function() {
        console.log(`File [${fieldName}] Finished`);
        console.info('upload');
      });
    });

    // 解析表单中其他字段信息
    busboy.on('field', function(fieldName, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('表单字段数据 [' + fieldName + ']: value: ' + inspect(val));
      result.formData[fieldName] = inspect(val);
    });

    // 解析结束事件
    busboy.on('finish', function( ) {
      console.log('文件上结束');
      resolve('upload finish')
    });

    // 解析错误事件
    busboy.on('error', function(err) {
      console.log('文件上出错');
      reject('upload error')
    });

    req.pipe(busboy)
  });
};

app.use(async (ctx, next) => {
  if (ctx.headers['content-type'] && ctx.headers['content-type'].includes('multipart/form-data')) {
    console.info('upload start');
    try {
      const msg = await upload(ctx);
      console.info(msg);
    } catch (e) {
      console.warn(e);
    }
  }
  await next();
});

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(Static(path.join(__dirname, '../public/')));

app.listen(PORT);
console.info('server run http://localhost:' + PORT);
