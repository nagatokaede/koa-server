'use static';

const Router = require('koa-router');
const { succeedUtil, failedUtil } = require('../../../util/response');

const router = new Router({
  prefix: '/user'
});

// 单个用户增删改查
router
  .get('/:id', ctx => {
    const data = {};
    Object.assign(data, ctx.params, ctx.query);
    ctx.body = succeedUtil(data);
  })
  .post('/', ctx => {
    // ...
  })
  .put('/:id', ctx => {
    // ...
  })
  .del('/:id', ctx => {
    // ...
  });

module.exports = router;
