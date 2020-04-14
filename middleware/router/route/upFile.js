'use static';

const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const { succeedUtil, failedUtil } = require('../../../util/response');
const { putStream } = require('../../../modules/oss');

const upFiles = require('../util/batchOSS');

const router = new Router();



router.post('/easy', async ctx => {
  console.log('upload', '开始上传OSS', new Date().getTime());

  const ossList = Object.values(ctx.request.files).map(item => {
    return putStream(path.extname(item.path), fs.createReadStream(item.path))
  });

  try {
    const urls = await upFiles(ossList);
    ctx.body = succeedUtil(urls);
  } catch (err) {
    ctx.throw(500, failedUtil(err, '001'));
  }
  console.log(new Date().getTime());
});

module.exports = router;
