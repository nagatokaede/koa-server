'use strict';

const mongoose = require('mongoose');

/**
 * ------- 验证码表 ---------
 * captcha: <Number> 验证码
 * captchaDate: <Number> 验证码创建时间
 */
const captchaSchema = mongoose.Schema({
  captcha: String,
  status: {
    type: Boolean,
    default: false,
  },
  captchaDate: {
    type: Number,
    default: Date.now(),
  },
});

const captchaModel = mongoose.model('captcha', captchaSchema);

module.exports = {
  captchaModel,
};
