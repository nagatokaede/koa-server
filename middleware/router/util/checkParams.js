'use strict';

// 参数类型字典
const dictionaries = {
  userName: 'string',
  password: 'string',
  nickName: 'string',

  region: 'string',
  accessKeyId: 'string',
  accessKeySecret: 'string',

  url: 'string',
  captchaId: 'string',
  captcha: 'string',
};

/**
 * 参数校验
 * @param {Object} params - 入参
 * @param {Array} filter - 校验列表
 * @returns {{}} - '' 为空时验证通过
 */
module.exports = (params, filter) => {
  let msg = {};
  for (const key of filter) {
    if (!params[key]) msg[key] = 'missing';
    if (msg[key]) continue;

    if (typeof params[key] !== dictionaries[key]) msg[key] = dictionaries[key];
  }
  return msg;
};

