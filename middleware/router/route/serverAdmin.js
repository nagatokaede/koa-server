'use strict';

const Router = require('koa-router');
const { userFindOne, userInsert } = require('../../../modules/mongo').user;
const { succeedUtil, failedUtil } = require('../../../util/response');
const { sign } = require('../../../util/jwt');
const hash = require('../../../util/crypto');
const check = require('../util/checkParams');

const router = new Router();

// 登陆和创建用户
router
  .post('/login', async ctx => {
    // 获取参数
    const body = ctx.request.body;
    // 验证参数
    const checkParamsMsg = check(body, ['userName', 'password']);
    if (Object.keys(checkParamsMsg).length) ctx.throw(401, failedUtil(checkParamsMsg, '401'));

    try {
      // 查询用户
      const userInfo = await userFindOne({ userName: body.userName });
      if (typeof userInfo.status === 'number' || hash(body.password) !== userInfo.password) {
        ctx.body = failedUtil('用户名或密码错误', '002');
        return 0;
      }
      // 签发 token
      const { userName, nickName, _id } = userInfo;
      const token = await sign({ userName, nickName, _id });
      // 响应
      ctx.set('token', token);
      ctx.body = succeedUtil('登录成功');
    } catch (err) {
      console.warn(err);
      ctx.throw(500, failedUtil(err, '001'));
    }
  })
  .post('/create',async ctx => {
    // 获取参数
    const body = ctx.request.body;
    // 验证参数
    const checkParamsMsg = check(body, ['userName', 'password', 'nickName']);
    if (Object.keys(checkParamsMsg).length) ctx.throw(401, failedUtil(checkParamsMsg, '401'));
    // 创建用户&响应
    try {
      ctx.body = succeedUtil(await userInsert(body));
    } catch (err) {
      console.warn(err);
      ctx.throw(500, failedUtil(err, '001'));
    }
  });

module.exports = router;
