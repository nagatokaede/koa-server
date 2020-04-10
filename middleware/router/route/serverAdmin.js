'use static';

const Router = require('koa-router');
const { succeedUtil, failedUtil } = require('../../../util/response');
const { sign } = require('../../../util/jwt');

const router = new Router();

// 登陆和创建用户
router
  .post('/login', async ctx => {
    try {
      console.log(ctx.request.body);
      const token = await sign({ name: 'nagato', id: '15498' });
      ctx.body = succeedUtil({ access: token });
    } catch (err) {
      ctx.throw(500, failedUtil(err, '001'));
    }
  })
  .post('/create',async ctx => {
    try {
      console.log(ctx.request.body);
      const token = await sign({ name: 'nagato', id: '15498' });
      ctx.body = succeedUtil({ access: token });
    } catch (err) {
      ctx.throw(500, failedUtil(err, '001'));
    }
  });

module.exports = router;
