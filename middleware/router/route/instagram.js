'use static';

const Router = require('koa-router');
const ins = require('../../../modules/instagramSpider');

const router = new Router();

router
  .get('/search', async ctx => {
    try {
      ctx.body = JSON.stringify(await ins.spider('https://www.instagram.com/p/BvYbAbrBU8v/?utm_source=ig_share_sheet&igshid=betpf9thpwz5'));
    } catch (err) {
      ctx.body = JSON.stringify(err);
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
