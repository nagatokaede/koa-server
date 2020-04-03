'use static';

const Router = require('koa-router');
const ins = require('../../../modules/instagramSpider');
const { console_level } = require('../../../server/config');
const { succeedUtil, failedUtil } = require('../../../util/response');

ins.setConsoleLevel(console_level);

const router = new Router();

router
  .get('/search', async ctx => {
    try {
      ctx.body = succeedUtil(await ins.spider('https://www.instagram.com/p/BvYbAbrBU8v/?utm_source=ig_share_sheet&igshid=betpf9thpwz5'));
    } catch (err) {
      ctx.body = failedUtil(err, '001');
    }
  });
  // .post('/', ctx => {
  //   // ...
  // })
  // .put('/', ctx => {
  //   // ...
  // })
  // .del('/', ctx => {
  //   // ...
  // });

module.exports = router;
