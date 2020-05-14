'use strict';

const mongoose = require('mongoose');

// require('../conn_mongo');

/**
 * ------- 用户表 ---------
 * createTime: <Date> 创建时间
 * userName: <string> 用户名
 * password: <string> 密码
 * nickName: <string> 昵称
 * delete: <Boolean> 逻辑删除
 */
const userSchema = mongoose.Schema({
  createTime: {
    type: Date,
    default: new Date(),
  },
  userName: String,
  password: String,
  nickName: String,
  delete: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model('user', userSchema);

module.exports = {
  userModel,
};
