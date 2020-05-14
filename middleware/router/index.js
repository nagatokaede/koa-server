'use strict';

const Router = require('koa-router');
const ins = require('./route/instagram'),
  admin = require('./route/serverAdmin'),
  upFile = require('./route/upFile'),
  config = require('./route/config');

const router = new Router();

router.use('/ins', ins.routes());
router.use('/admin', admin.routes());
router.use('/upFile', upFile.routes());
router.use('/config', config.routes());

module.exports = router;
