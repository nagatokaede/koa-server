'use strict';

const mongoose = require('mongoose');

/**
 * ------- 用户表 ---------
 * createTime: <Date> 创建时间
 * userName: <string> 用户名
 * password: <string> 密码
 * nickName: <string> 昵称
 * delete: <Boolean> 逻辑删除
 */
const configSchema = mongoose.Schema({
  region: String,
  accessKeyId: String,
  accessKeySecret: String,
  internal: String,
  bucket: String,
});

const configModel = mongoose.model('config', configSchema);

module.exports = {
  configModel
};
