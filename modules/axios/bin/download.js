'use strict';

const axios = require('axios');

/**
 * 下载网络文件
 * @param {string} url - 下载地址
 * @returns {Promise<*>} stream
 */
const downloadFile = async (url) => {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  return response.data;
};


module.exports = {
  downloadFile,
};
