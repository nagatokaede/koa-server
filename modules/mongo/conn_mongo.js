'use strict';

const mongoose = require('mongoose');
const config = require('../../server/config');

const user = config.MONGO_USER ? config.MONGO_USER + ':' + config.MONGO_PASSWORD +'@' : '';

const dbPath = `mongodb://${user}${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DB}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/* 连接数据库 */
mongoose.connect(dbPath, options, err => {
  if (err) console.warn(err);
});

/* 监听 MongoDB 连接状态 */

// 连接
mongoose.connection.once('open', (err) => {
  if (!err) console.info(`数据库已连接！！`);
});

// 断开
mongoose.connection.once('close', (err) => {
  if (!err) console.warn(`数据库已断开！！`);
});

// 错误
mongoose.connection.on('error', (err) => {
  if (!err) console.warn(err);
});
