'use static';

const mongo = require('./conn_mongo');

const user = require('./util/user');

module.exports = {
  mongo,
  user,
};
