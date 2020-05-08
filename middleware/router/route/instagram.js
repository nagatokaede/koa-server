'use static';

const Router = require('koa-router');
const path = require('path');
const ins = require('../../../modules/instagramSpider');
const { downloadFile } = require('../../../modules/axios');
const { putStream } = require('../../../modules/oss');
const { console_level } = require('../../../server/config');
const { succeedUtil, failedUtil } = require('../../../util/response');
const check = require('../util/checkParams');

const upFiles = require('../util/batchOSS');

ins.setConsoleLevel(console_level);

const router = new Router();

router
  .get('/search', async ctx => {
    let urls,ossList,warnUrls = [];
    // 获取参数
    const query = ctx.query;
    // 检验参数
    const checkParamsMsg = check(query, ['url']);
    if (Object.keys(checkParamsMsg).length) ctx.throw(401, failedUtil(checkParamsMsg, '401'));

    // 爬取图片列表
    try {
      urls = await ins.spider(query.url);
    } catch (err) {
      ctx.throw(err);
    }

    console.info(urls);

    // 建立 axios 下载通道，建立阿里云OSS上传列表
    ossList = urls.map(async url => {
      try {
        return putStream(path.basename(url.split('?')[0]), await downloadFile(url), ctx.ossInfo);
      } catch (err) {
        console.warn(err);
        warnUrls.push(url);
        return '';
      }
    }).filter(item => item);

    // 批量上传
    try {
      const urls = await upFiles(ossList);
      console.info(urls, warnUrls);
      ctx.body = succeedUtil({ urls, warnUrls });
    } catch (err) {
      ctx.throw(500, failedUtil(err, '001'));
    }
  });

module.exports = router;
