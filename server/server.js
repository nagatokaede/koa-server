'use Static';

const { PORT } = require('./config');

const koa = require('koa');
const koaBody = require('koa-body');
const path = require('path');
const Static = require('koa-static');

const logger = require('../middleware/logger');
const router = require('../middleware/router');
const access = require('../middleware/access');
// const { mkdir } = require('../util/fs');

const app = new koa();

app.use(logger);

app.use(access(['admin']));

app.use(koaBody());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(Static(path.join(__dirname, '../public/')));

app.listen(PORT);
console.info('server run http://localhost:' + PORT);
