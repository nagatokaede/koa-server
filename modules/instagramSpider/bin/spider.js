'use strict';

const axios = require('axios');

// OFF、WARN、DEBUG、ALL
let console_level = 'DEBUG';

const getHtml = url => {
  return new Promise((resolve, reject) => {
    if (['DEBUG', 'ALL'].includes(console_level)) {
      console.time('req-spider-end');
      console.info('req-spider-start');
    }

    axios.get(url)
      .then(res => {
        if (res.status === 200) {
          const reg = /(display_url":")[a-zA-z]+:\/\/[^"]*/ig;
          // 初步解析内容
          const content = res.data.match(reg);
          // 进一步解析
          const urlList = content.map(item => item.split('display_url":"')[1].replace(/\\u0026/g, '&'));
          // 去重返回
          if (['DEBUG', 'ALL'].includes(console_level)) {
            console.debug(urlList);
          }
          resolve([...new Set(urlList)]);
        }
      })
      .catch(err => {
        if (['WARN', 'DEBUG', 'ALL'].includes(console_level)) {
          console.warn(err);
        }
        reject('Instagram Spider Error: ' + err.code);
      })
      .finally(() => {
        if (['DEBUG', 'ALL'].includes(console_level)) {
          console.timeEnd('req-spider-end');
        }
      });
  });
};

const setConsoleLevel = level => {
  console_level = level;
};

module.exports = { getHtml, setConsoleLevel };
