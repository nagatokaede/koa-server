'use static';

const Busboy = require('busboy');
const fs = require('fs');
const path = require('path');
const { mkdir } = require('../../util/fs');

const upload = (ctx, options) => {
  return new Promise((resolve, reject) => {
    let field,msg;
    if (!ctx.request.files) ctx.request.files = {};
    // 创建目录
    if (!options.streamFunction) mkdir(path.join(options.root, options.path));

    const req = ctx.req;
    const busboy = new Busboy({ headers: req.headers });
  
    busboy.on('file', function (fieldName, file, filename, encoding, mimeType) {
      console.info(`File [${fieldName}]: filename: ${filename} encoding: ${encoding} mimeType: ${mimeType}`);
      field = fieldName;
      // 本地存储地址
      const filePath = path.join(options.root, options.path, options.name || filename);
      // 网络展示地址
      const url = path.join(options.path, options.name || filename).replace(/\\/g, '/');

      // 过滤
      if(!options.filter.includes(path.extname(filename).slice(1).toLowerCase())) {
        msg = 'upload file type error';
        file.resume(); // 跳出上传
        return 0;
      }

      // 文件上传OSS或保存到特定路径
      if (options.streamFunction) {
        options.streamFunction(file, url);
      } else {
        file.pipe(fs.createWriteStream(filePath));
      }
    
      // 开始解析文件流
      file.on('data', function (data) {
        console.info(`File [${fieldName}] got ${data.length} bytes`);
      });
    
      // 解析文件结束
      file.on('end', function () {
        ctx.request.files[field] = url;
        console.info(`File [${fieldName}] Finished`);
      });
    });

    // 解析结束事件
    busboy.on('finish', () => {
      console.info('upload finish');
      // 将地址传入上下文
      if (!ctx.request.files[field]) ctx.request.files[field] = msg;
      console.info(ctx.request.files);
      resolve('upload finish');
    });

    // 解析错误事件
    busboy.on('error', err => {
      console.warn('upload error: ' + err);
      reject('upload error');
    });
  
    req.pipe(busboy);
  });
};

/**
 * 流上传文件可指定管道上传OSS
 * @param {object} options - [ path(保存路径), name(保存文件名), streamFunction(接入流管道方法) ]
 * @returns {Function}
 */
module.exports = (options = {}) => {
  // 设置默认参数
  Object.assign(options, {
    root: options.root || path.join(__dirname, '../../public'),
    path: options.path || 'upload',
    filter: options.filter || [ 'jpg', 'jepg', 'png' ],
  });

  // 返回 middleware
  return async (ctx, next) => {
    if (ctx.headers['content-type'] && ctx.headers['content-type'].includes('multipart/form-data')) {
      console.info('upload start');
      try {
        await upload(ctx, options);
      } catch (e) {
        console.warn(e);
      }
    }
    await next();
  }
};

