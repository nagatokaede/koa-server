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
    let urls,ossList,warnUrls = [];

    // 爬取图片列表
    try {
      urls = await ins.spider('https://www.instagram.com/p/BvYbAbrBU8v/?utm_source=ig_share_sheet&igshid=betpf9thpwz5');
    } catch (err) {
      ctx.throw(err);
    }

    console.info(urls);

    // 建立 axios 下载通道，建立阿里云OSS上传列表
    ossList = urls.map(async url => {
      try {
        return putStream(path.basename(url.split('?')[0]), await downloadFile(url));
      } catch (err) {
        console.warn(err);
        warnUrls.push(url);
        return '';
      }
    }).filter(item => item);

    // 批量上传
    try {
      const urls = await upFiles(ossList);
      ctx.body = succeedUtil({ urls, warnUrls });
    } catch (err) {
      ctx.throw(500, failedUtil(err, '001'));
    }
  });

module.exports = router;
