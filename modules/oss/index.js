'use strict';

// const { listBuckets, putBucket, getBucketACL, putBucketACL, deleteBucket } = require('./bin/bucket');
const { put, putStream } = require('./bin/upload');
const { judge, list } = require('./bin/objectManage');

module.exports = {
  // listBuckets,
  // putBucket,
  // getBucketACL,
  // putBucketACL,
  // deleteBucket,

  put,
  putStream,

  judge,
  list,
};
