'use static';

// 参数类型字典
const dictionaries = {
  userName: 'string',
  password: 'string',
  nickName: 'string',
};

module.exports = (params, filter) => {
  filter.forEach(key => {
    if (!params.key) return key + ' 缺失';
    
    if (typeof params.key !== dictionaries.key) return key + ' 应为 ' + dictionaries.key + ' 类型';
  });
};

