'use static';

const { getHtml, setConsoleLevel } = require('./bin/spider');

module.exports = {
  spider: getHtml,
  setConsoleLevel,
};
