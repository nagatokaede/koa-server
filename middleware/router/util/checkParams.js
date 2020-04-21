'use static';

// 参数类型字典
const dictionaries = {
  userName: 'string',
  password: 'string',
  nickName: 'string',

  region: 'string',
  accessKeyId: 'string',
  accessKeySecret: 'string',

  url: 'string',
};

module.exports = (params, filter) => {
  let msg = {};
  for (const key of filter) {
    if (!params[key]) msg[key] = 'missing';
    if (msg[key]) continue;

    if (typeof params[key] !== dictionaries[key]) msg[key] = dictionaries[key];
  }
  return msg;
};

