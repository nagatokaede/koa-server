'use static';

/********************* 存储空间管理 *****************************/

const { client } = require('../oss');

/**
 * 上传文件
 * @param {string} objectName - 自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
 * @param {string|buffer} file - 本地文件地址 或 内存文件
 * @return {Promise<void>}
 */
async function put (objectName, file) {
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
 * @return {Promise<{res, name, url}>}
 */
async function putStream (objectName, stream) {
  try {
    // use 'chunked encoding'
    // let stream = fs.createReadStream('local-file');
    let result = await client.putStream(objectName, stream);
    return result.url;

    // don't use 'chunked encoding'
    // let stream = fs.createReadStream('local-file');
    // let size = fs.statSync('local-file').size;
    // let result = await client.putStream(
    //   'object-name', stream, {contentLength: size});
    // console.log(result);
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  put,
  putStream,
};
