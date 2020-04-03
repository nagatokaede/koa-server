'use static';

const axios = require('axios');

const getHtml = url => {
  return new Promise((resolve, reject) => {
    console.info('--- 开始爬取资源 ---');

    axios.get(url)
      .then(res => {
        if (res.status === 200) {
          const reg = /(display_url":")[a-zA-z]+:\/\/[^"]*/ig;
          // 初步解析内容
          const content = res.data.match(reg);
          // 进一步解析
          const urlList = content.map(item => item.split('display_url":"')[1].replace(/\\u0026/g, '&'));
          // 去重返回
          resolve(new Set(urlList));
        }
      })
      .catch(err => {
        reject('Instagram Spider Error: ' + err)
      })
      .finally(() => {
        console.info('--- 爬取资源结束 ---');
      });
  });
};

module.exports = getHtml;
