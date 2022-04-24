var express = require('express');
var router = express.Router();
const { index } = require('./controller');
const { isLoginAdmin } = require('../middleware/auth');

/* ROUTERS. */
router.use(isLoginAdmin); //session
router.get('/', index);

module.exports = router;
