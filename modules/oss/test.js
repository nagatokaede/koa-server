'use strict';

const ossApi = require('./index');
const fs = require('fs');
// const path = require('path');

// 存储空间管理 测试
// (async function () {
//   let bucket,acl,msg = '';
//
//   try {
//     msg = await ossApi.putBucket('kaede-oss');
//   } catch (e) {
//     console.warn(e);
//   }
//
//   console.info(msg);
//
//   try {
//     bucket = await ossApi.listBuckets();
//     console.info(bucket);
//     bucket = bucket[0] ? bucket[0].name : '';
//   } catch (e) {
//     console.warn(e);
//   }
//
//   console.info(bucket);
//
//   if (bucket) {
//     try {
//       acl = await ossApi.getBucketACL(bucket);
//     } catch (e) {
//       console.warn(e);
//     }
//
//     console.info(acl);
//
//     try {
//       msg = await ossApi.putBucketACL(bucket, 'private');
//     } catch (e) {
//       console.warn(e)
//     }
//
//     console.info(msg);
//
//     try {
//       msg = await ossApi.putBucketACL(bucket, 'public-read');
//     } catch (e) {
//       console.warn(e)
//     }
//
//     console.info(msg);
//
//     try {
//       msg = await ossApi.deleteBucket(bucket);
//     } catch (e) {
//       console.warn(e);
//     }
//
//     console.info(msg);
//   }
// })();

// 上传 测试
// (async function () {
//   let msg = '';
//
//   try {
//     const stream = fs.createReadStream(__filename);
//     msg = await ossApi.putStream('test.js', stream);
//   } catch (e) {
//     console.warn(e);
//   }
//
//   console.info(msg);
//
//   try {
//     msg = await ossApi.put('test2.js', __filename);
//   } catch (e) {
//     console.warn(e);
//   }
//
//   console.info(msg);
// })();

// 查询测试
const options = {
  region: "oss-cn-shanghai",
  accessKeyId: "",
  accessKeySecret: "",
};

(async function () {
  console.time('list');
  const info = await ossApi.judge('83592580_2805425739515761_7827284750852853400_n.jpg', options);
  // const info = await ossApi.list(options, { prefix: '83592580_2805425739515761_7827284750852853400_n.jpg' });
  console.timeEnd('list');
  console.info(info);
})();
