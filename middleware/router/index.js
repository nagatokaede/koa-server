'use static';

const Router = require('koa-router');
const user = require('./route/user'),
  ins = require('./route/instagram'),
  admin = require('./route/serverAdmin');

const router = new Router();

router.use('/user', user.routes());
router.use('/ins', ins.routes());
router.use('/admin', admin.routes());

module.exports = router;
