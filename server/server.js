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

const app = new koa();

app.use(logger);

app.use(access(['admin', 'upload'], '60m'));

// 上传文件到OSS
app.use(upload({
  streamFunction: (stream, name) => {
    putStream(name, stream);
  },
}));

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(Static(path.join(__dirname, '../public/')));

app.listen(PORT);
console.info('server run http://localhost:' + PORT);
