'use static';

require('./conn_mongo');

const user = require('./util/user');

module.exports = {
  user,
};
