'use static';

const Router = require('koa-router');
const { configFind, configInsert, configChange } = require('../../../modules/mongo').config;
const { succeedUtil, failedUtil } = require('../../../util/response');
const check = require('../util/checkParams');

const router = new Router();

router
  .get('/search', async ctx => {
    try {
      const info = await configFind(ctx.query);
      ctx.body = succeedUtil(info);
    } catch (err) {
      ctx.throw(500, failedUtil(err, '001'));
    }
  })
  .post('/create', async ctx => {
    // 获取参数
    const body = ctx.request.body;
    // 验证参数
    const checkParamsMsg = check(body, [ 'region', 'accessKeyId', 'accessKeySecret' ]);
    if (Object.keys(checkParamsMsg).length) ctx.throw(401, failedUtil(checkParamsMsg, '401'));

    try {
      await configInsert(body);
      ctx.body = succeedUtil('success');
    } catch (err) {
      ctx.throw(500, failedUtil(err, '001'));
    }
  })
  .put('/change', async ctx => {
    // 获取参数
    const body = ctx.request.body;

    try {
      const msg = await configChange(body);
      console.log(msg);
      ctx.body = succeedUtil(msg);
    } catch (err) {
      ctx.throw(500, failedUtil(err, '001'));
    }
  });

module.exports = router;
