'use strict';

const fs = require('./index');
const path = require('path');

const dirname = path.dirname(path.join(__dirname, '/../../test/test/test/abc.js'));

// fs.mkdir(dirname);

fs.writeFile(dirname, 'abc.txt', 'test test test')
  .then(res => console.info(res))
  .catch(err => console.warn(err));
