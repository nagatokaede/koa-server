'use static';

/********************* 文件管理 *****************************/

const OSS = require('ali-oss');

function createClient(options) {
  return new OSS({
    region: options.region,
    accessKeyId: options.accessKeyId,
    accessKeySecret: options.accessKeySecret,
    bucket: options.bucket || 'kaede-oss',
  });
}

/**
 * 判断文件是否存在
 * @param {string} objectName - your file name
 * @param {object} clientOptions
 * @returns {Promise<boolean>}
 */
async function judge (objectName, clientOptions) {
  const client = createClient(clientOptions);
  
  try {
    console.info(new Date().getTime());
    let result = await client.get(objectName);
    if (result.res.status === 200) {
      return result.res.requestUrls;
    }
  } catch (err) {
    if (err.code === 'NoSuchKey') {
      return false
    }
  }
}


/**
 * 列举文件
 * @param {object} clientOptions
 * options {
 *   prefix: 只列出符合特定前缀的文件。
 *   marker: 只列出文件名大于 marker 之后的文件。
 *   delimiter: 用于获取文件的公共前缀。
 *   max-keys: 用于指定最多返回的文件个数。
 * }
 * @param {object} options
 * @returns {Promise<*>}
 */
async function list(clientOptions, options) {
  const client = createClient(clientOptions);

  try {
    // 不带任何参数，默认最多返回1000个文件。
    return await client.list(options);
    // 根据nextMarker继续列出文件。
    // if (result.isTruncated) {
    //   result = await client.list({
    //     marker: result.nextMarker
    //   });
    // }
    // // 列举前缀为'my-'的文件。
    // result = await client.list({
    //   prefix: 'my-'
    // });
    // console.log(result);
    // // 列举前缀为'my-'且在'my-object'之后的文件。
    // result = await client.list({
    //   prefix: 'my-',
    //   marker: 'my-object'
    // });
    // console.log(result);
  } catch (err) {
    console.warn(err);
    return err;
  }
}

module.exports = {
  judge,
  list,
};
