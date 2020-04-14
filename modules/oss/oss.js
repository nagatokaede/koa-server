'use static';

const OSS = require('ali-oss');
const { OSS_accessKeyId, OSS_accessKeySecret, OSS_region, OSS_internal } = require('../../server/config');

const clientBucket = new OSS({
  region: OSS_region,
  accessKeyId: OSS_accessKeyId,
  accessKeySecret: OSS_accessKeySecret,
  internal: OSS_internal,
});

const client = new OSS({
  region: OSS_region,
  accessKeyId: OSS_accessKeyId,
  accessKeySecret: OSS_accessKeySecret,
  internal: OSS_internal,
  bucket: 'kaede-oss',
});

module.exports = {
  clientBucket,
  client,
};
