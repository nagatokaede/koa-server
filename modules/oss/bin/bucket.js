'use static';

/********************* 存储空间管理 *****************************/

const client = require('../oss').clientBucket;


/**
 * 创建存储空间
 * @param {string} bucketName - your bucket name
 * @return {Promise<void>}
 */
async function putBucket(bucketName) {
  try {
    const result = await client.putBucket(bucketName);
    return result.res ? `create ${bucketName} bucket ${result.res.statusMessage}` : result;
  } catch (err) {
    console.warn(err);
    return err;
  }
}

/**
 * 列举存储空间
 * options {
 *   Delimiter {string} - 对Object名字进行分组的字符。所有Object名字包含指定的前缀，第一次出现Delimiter字符之间的Object作为一组元素
 *   Marker {string} - 设定从Marker之后按字母排序开始返回Object。Marker用来实现分页显示效果，参数的长度必须小于1024字节。
 *   Max-keys {string} - 指定返回Object的最大数。取值：大于0小于1000。默认值：100
 *   Prefix {string} - 限定返回文件的Key必须以Prefix作为前缀。
 *   Encoding-type {string} - 对返回的内容进行编码并指定编码的类型。
 * }
 * @param {object} options
 * @return {Promise<void>}
 */
async function listBuckets(options) {
  try {
    const result = await client.listBuckets(options);
    return result.buckets;
  } catch (err) {
    console.warn(err);
    return err;
  }
}

/**
 * 设置存储空间访问权限
 * @param {string} bucketName - your bucket name
 * @param {string} option - [ private(私有), public-read(公共读), public-read-write(公共读写) ]
 * @return {Promise<void>}
 */
async function putBucketACL(bucketName, option) {
  try {
    const result = await client.putBucketACL(bucketName, option);
    return result.res ? `set ${bucketName} bucket ${option} ${result.res.statusMessage}` : result;
  } catch (err) {
    console.log(err);
    return err;
  }
}

/**
 * 获取存储空间访问权限
 * @param {string} bucketName - your bucket name
 * @return {Promise<void>}
 */
async function getBucketACL(bucketName) {
  try {
    const result = await client.getBucketACL(bucketName);
    return result.acl;
  } catch (err) {
    console.log(err);
    return err;
  }
}

/**
 * 删除存储空间
 * 删除存储空间之前，必须先删除存储空间下的所有文件、LiveChannel和分片上传产生的碎片。
 * @param {string} bucketName - your bucket name
 * @return {Promise<void>}
 */
async function deleteBucket(bucketName) {
  try {
    const result = await client.deleteBucket(bucketName);
    return result.res ? `delete ${bucketName} bucket OK` : result;
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  putBucket,
  listBuckets,
  putBucketACL,
  getBucketACL,
  deleteBucket,
};
