'use static';

const Router = require('koa-router');
const path = require('path');
const ins = require('../../../modules/instagramSpider');
const { downloadFile } = require('../../../modules/axios');
const { putStream, judge } = require('../../../modules/oss');
const { console_level } = require('../../../server/config');
const { succeedUtil, failedUtil } = require('../../../util/response');
const check = require('../util/checkParams');

const upFiles = require('../util/batchOSS');

ins.setConsoleLevel(console_level);

const router = new Router();

router
  .post('/search', async ctx => {
    let insUrls,judgeList,ossList,urls = [];
    const warnUrls = [];
    // 获取参数
    const body = ctx.request.body;
    // 检验参数
    const checkParamsMsg = check(body, ['url']);
    if (Object.keys(checkParamsMsg).length) ctx.throw(401, failedUtil(checkParamsMsg, '401'));

    // 爬取图片列表
    try {
      insUrls = await ins.spider(body.url);
      console.info(insUrls);
    } catch (err) {
      ctx.throw(err);
    }

    // 解析文件名
    const regexp = /(?!.*\/).*(jpg|jepg|png)/gi;

    // 建立 axios 下载通道，建立阿里云OSS上传列表
    ossList = urls.map(async url => {
      try {
        const judgeUrl = await judge(url.match(regexp)[0], ctx.ossInfo);
        console.info(judgeUrl);
        judgeList.push(judgeUrl);
        return '';
      } catch (e) {
        try {
          return putStream(url.match(regexp)[0], await downloadFile(url), ctx.ossInfo);
        } catch (err) {
          console.warn(err);
          warnUrls.push(url);
          return '';
        }
      }
    }).filter(item => item);

    // 批量上传
    try {
      urls = await upFiles(ossList);
      console.info(urls);
      urls.concat(judgeList);
      ctx.body = succeedUtil({ urls, warnUrls });
    } catch (err) {
      ctx.throw(500, failedUtil(err, '001'));
    }
  });

module.exports = router;
