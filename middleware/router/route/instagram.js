'use static';

const Router = require('koa-router');
const path = require('path');
const ins = require('../../../modules/instagramSpider');
const { downloadFile } = require('../../../modules/axios');
const { putStream } = require('../../../modules/oss');
const { console_level } = require('../../../server/config');
const { succeedUtil, failedUtil } = require('../../../util/response');

const upFiles = require('../util/batchOSS');

ins.setConsoleLevel(console_level);

const router = new Router();

router
  .get('/search', async ctx => {
    let urls,ossList;

    try {
      urls = await ins.spider('https://www.instagram.com/p/BvYbAbrBU8v/?utm_source=ig_share_sheet&igshid=betpf9thpwz5');
    } catch (err) {
      ctx.throw(500, failedUtil(err, '001'));
      return 0;
    }

    console.info(urls);
  
    ossList = urls.map(async url => {
      return putStream(path.basename(url), await downloadFile(url));
    });
  
    try {
      const urls = await upFiles(ossList);
      ctx.body = succeedUtil(urls);
    } catch (err) {
      ctx.throw(500, failedUtil(err, '001'));
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
