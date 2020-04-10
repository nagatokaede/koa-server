'use strict';

// 成功响应
const succeedUtil = res => {
  return {
    data: res || {},
    status: 'SUCCEED',
  };
};

// 失败响应
const failedUtil = (errorMessage, errorCode) => {
  return JSON.stringify({
    status: 'FAILED',
    errorCode,
    errorMessage,
  });
};

module.exports = {
  succeedUtil,
  failedUtil,
};
