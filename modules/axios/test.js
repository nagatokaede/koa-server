'use strict';

const { downloadFile } = require('./index');
const { mkdir } = require('../../util/fs');
const fs = require('fs');
const path = require('path');

(async function() {
  const dirname = path.join(__dirname, '../../test');
  
  mkdir(dirname);
  
  const url = 'https://github.com/nagatokaede/koa-server.git';
  
  const writer = fs.createWriteStream(path.join(dirname, 'koa-server.zip'));

  const stream = await downloadFile(url);
  
  stream.pipe(writer);
  
  writer.on('finish', () => {
    console.info('写入已完成');
  });
  
  writer.on("error", (err) => {
    console.warn(err);
  });
})();
