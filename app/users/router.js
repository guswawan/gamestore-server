var express = require('express');
var router = express.Router();
const { viewSignin, actionSignin } = require('./controller');

/* ROUTERS. */
router.get('/', viewSignin);
router.post('/', actionSignin);

module.exports = router;
