'use strict';

const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const { succeedUtil, failedUtil } = require('../../../util/response');
const { putStream } = require('../../../modules/oss');

const upFiles = require('../util/batchOSS');

const router = new Router();



router.post('/easy', async ctx => {
  // 获取上传文件地址，创建阿里云OSS流上传列表
  // const ossList = Object.values(ctx.request.files).map(item => {
  //   return putStream(path.basename(item.path), fs.createReadStream(item.path))
  // });
  //
  // try {
  //   // 批量上传阿里云OSS
  //   const urls = await upFiles(ossList);
  //   ctx.body = succeedUtil(urls);
  // } catch (err) {
  //   ctx.throw(500, failedUtil(err, '001'));
  // }

  ctx.body = succeedUtil(ctx.request.files);
});

module.exports = router;
