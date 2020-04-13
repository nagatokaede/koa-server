'use static';

const Router = require('koa-router');
const { writeFile } = require('../../../util/fs');

const router = new Router();

router.post('/easy', async ctx => {
  console.info(ctx.request.files);
  ctx.body = '上传成功';
});

module.exports = router;
