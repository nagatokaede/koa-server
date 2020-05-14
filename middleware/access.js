'use strict';

const { failedUtil } = require('../util/response');
const JWT = require('../util/jwt');

module.exports = (option = [], exp) => {
  return async (ctx, next) => {
    let tokenInfo;

    // 判断放行路由 option
    if (!option.includes(ctx.url.split('/')[1])) {
      const token = ctx.headers.token || ctx.query.token || ctx.headers['access'];

      // 验证  token 有效性，读取 token 信息，写入 params
      if (token) {
        try {
          tokenInfo = await JWT.verify(token);
          delete tokenInfo.iat;
          delete tokenInfo.exp;

          if (!ctx.tokenInfo) ctx.tokenInfo = {};
          Object.assign(ctx.tokenInfo, tokenInfo);
        } catch (err) {
          ctx.throw(403, failedUtil(err.message, '002'));
        }
      } else {
        ctx.throw(403, failedUtil('无权限访问', '002'));
      }
    }

    await next();

    // 签署新的 token 并写入响应 header 中
    if (tokenInfo) {
      ctx.set('token', await JWT.sign(tokenInfo, exp));
    }
  };
};
