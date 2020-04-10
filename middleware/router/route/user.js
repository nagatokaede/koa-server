'use static';

const Router = require('koa-router');
const { succeedUtil, failedUtil } = require('../../../util/response');

const router = new Router();

// 单个用户删改查
router
  .get('/:id', ctx => {
    const data = {};
    Object.assign(data, ctx.params, ctx.query, ctx.tokenInfo);
    ctx.body = succeedUtil(data);
  })
  .put('/:id', ctx => {
    // ...
  })
  .del('/:id', ctx => {
    // ...
  });

module.exports = router;
