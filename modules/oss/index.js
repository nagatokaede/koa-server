'use static';

const { listBuckets, putBucket, getBucketACL, putBucketACL, deleteBucket } = require('./bin/bucket');
const { put, putStream } = require('./bin/upload');

module.exports = {
  listBuckets,
  putBucket,
  getBucketACL,
  putBucketACL,
  deleteBucket,

  put,
  putStream,
};
