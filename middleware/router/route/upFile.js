'use static';

const Router = require('koa-router');
const path = require('path');
const { succeedUtil, failedUtil } = require('../../../util/response');
const { MONGO_HOST, PORT } = require('../../../server/config');

const router = new Router();

router.post('/easy', async ctx => {
  ctx.body = succeedUtil(Object.values(ctx.request.files)
    .map(item => {
      const pathSep = item.path.split(path.sep);
      return `//${MONGO_HOST}:${PORT}/` + path.join('upload', ...pathSep.slice(-2, pathSep.length)).replace(/\\/g, '/');
    }));
});

module.exports = router;
