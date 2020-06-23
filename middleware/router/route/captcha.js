'use strict';

const Router = require('koa-router');
const { findOne, insert, update, remove } = require('../../../modules/mongo').captcha;
const { succeedUtil, failedUtil } = require('../../../util/response');
const check = require('../util/checkParams');
const captcha = require('../../../util/captcha');

const router = new Router();

const createOrUpdate = async (captchaId) => {
  // 获取验证码
  const { text, data } = captcha();
  // 存储验证码
  let message = {};
  if (captchaId) {
    message = await update({ text, captchaId });
    message._id = message._id ? message._id : captchaId;
  } else {
    message = await insert({ text });
  }
  // 返回
  return {
    data,
    captchaId: message._id,
  }
}

router
  .get('/update', async ctx => {
    // 删除过期验证码
    remove();
    let content = {};
    // 获取验证参数
    const body = ctx.query;
    const checkParamsMsg = check(body, ['captchaId']);

    if (Object.keys(checkParamsMsg).length) {
      content = await createOrUpdate();
    } else {
      // 参数不为空更新 查询验证码
      const oldCaptcha = await findOne(body);
      if (oldCaptcha.status === 0) {
        // 创建
        content = await createOrUpdate();
      } else {
        // 更新
        content = await createOrUpdate(body.captchaId);
      }
    }
    // 发送结果
    ctx.body = succeedUtil(content);
  });

module.exports = router;
