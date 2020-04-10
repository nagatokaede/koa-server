'use static';

const { PORT } = require('./config');

const koa = require('koa');
const koaBody = require('koa-body');

const logger = require('../middleware/logger');
const router = require('../middleware/router');
const access = require('../middleware/access');

const app = new koa();

app.use(logger);

app.use(access(['admin']));

app.use(koaBody());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);
console.info('server run http://localhost:' + PORT);
