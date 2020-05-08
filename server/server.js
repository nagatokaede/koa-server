'use Static';

const { PORT } = require('./config');

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const Static = require('koa-static');

const logger = require('../middleware/logger');
const router = require('../middleware/router');
const access = require('../middleware/access');

const upload = require('../middleware/upload');
const { putStream } = require('../modules/oss');

// 配置查询
const { configFind } = require('../modules/mongo').config;

const app = new koa();

app.use(logger);

app.use(access(['admin', 'upload'], '60m'));

// 查询 oss 信息
app.use(async (ctx , next) => {
  ctx.ossInfo = await configFind();
  await next();
});

// 上传文件到OSS
app.use(upload({
  streamFunction: (stream, name, ctx) => {
    putStream(name, stream, ctx.ossInfo);
  },
}));

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(Static(path.join(__dirname, '../public/')));

app.listen(PORT);
console.info('server run http://localhost:' + PORT);
