'use static';

const OSS = require('ali-oss');
// const { ossInfo.accessKeyId, ossInfo.accessKeySecret, ossInfo.region, ossInfo.internal } = require('../../server/config');
// 配置查询
const { config } = require('../../modules/mongo');

(async function () {
  try {
    const ossInfo = await config.configFind();

    const clientBucket = new OSS({
      region: ossInfo.region,
      accessKeyId: ossInfo.accessKeyId,
      accessKeySecret: ossInfo.accessKeySecret,
      internal: ossInfo.internal || false,
    });

    const client = new OSS({
      region: ossInfo.region,
      accessKeyId: ossInfo.accessKeyId,
      accessKeySecret: ossInfo.accessKeySecret,
      internal: ossInfo.internal || false,
      bucket: 'kaede-oss',
    });

    module.exports = {
      clientBucket,
      client,
    };
  } catch (e) {
    console.warn(e);
  }
})();


