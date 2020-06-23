'use strict';

const svgCaptcha  = require("svg-captcha");

const createCode = () => {
  return svgCaptcha.createMathExpr({
    size: 6, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 4, // 干扰线条的数量
    color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
  });
}

module.exports = createCode;
