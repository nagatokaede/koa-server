'use strict';

const Busboy = require('busboy');

module.exports = ctx => {
  const req = ctx.req;

  const busboy = new Busboy({ headers: req.headers });

  busboy.on('file', (fieldName, file, filename, encoding, mimetype) => {
    console.info(`File [${fieldname}]: filename: ${filename}; encoding: ${encoding}; mimetype: ${mimetype}`);

    return file;
  });

  // 监听结束事件
  busboy.on('finish', function() {
    console.info('upload stream finish');
  });

  // 解析错误事件
  busboy.on('error', err => {
    console.warn('upload stream error: ' + err);
  });

  req.pipe(busboy);
};
