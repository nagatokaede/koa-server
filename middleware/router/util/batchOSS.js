'use strict';

const reqAll = ossList => Promise.all([...ossList]);

module.exports = reqAll;
