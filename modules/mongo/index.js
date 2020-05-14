'use strict';

require('./conn_mongo');

const user = require('./util/user'),
  config = require('./util/config');

module.exports = {
  user,
  config
};
