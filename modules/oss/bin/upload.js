'use static';

/********************* 上传文件管理 *****************************/

// const { client } = require('../oss');
const OSS = require('ali-oss');

/**
 * 上传文件
 * @param {string} objectName - 自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
 * @param {string|buffer} file - 本地文件地址 或 内存文件
 * @param {object} options - oss 配置信息
 * @return {Promise<void>}
 */
async function put (objectName, file, options) {
  const client = new OSS({
    region: options.region,
    accessKeyId: options.accessKeyId,
    accessKeySecret: options.accessKeySecret,
    internal: options.internal || false,
    bucket: 'kaede-oss',
  });

  try {
    let result = await client.put(objectName, file);
    return result.url;
  } catch (err) {
    console.log(err);
    return err;
  }
}

/**
 * 流式上传
 * @param {string} objectName - 自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
 * @param {ReadStream} stream - 文件流
 * @param {object} options - oss 配置信息
 * @return {Promise<{res, name, url}>}
 */
async function putStream (objectName, stream, options) {
  const client = new OSS({
    region: options.region,
    accessKeyId: options.accessKeyId,
    accessKeySecret: options.accessKeySecret,
    internal: options.internal || false,
    bucket: 'kaede-oss',
  });

  try {
    let result = await client.putStream(objectName, stream);
    return result.url;
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  put,
  putStream,
};
