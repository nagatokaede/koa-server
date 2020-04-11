'use static';

const crypto = require('crypto');

module.exports = data => {
  return crypto.createHmac('sha256', 'hotcake').update(data).digest('hex');
};
