'use static';

const Router = require('koa-router');
const ins = require('./route/instagram'),
  admin = require('./route/serverAdmin');

const router = new Router();

router.use('/ins', ins.routes());
router.use('/admin', admin.routes());

module.exports = router;
