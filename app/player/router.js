var express = require('express');
var router = express.Router();
const {
  landingPage,
  detailPage,
  category,
  checkout,
  transactionHistory,
  historyDetail,
  dashboard,
} = require('./controller');
const { isLoginPlayer } = require('../middleware/auth');

router.get('/landingpage', landingPage);
router.get('/:id/detail', detailPage);
router.get('/category', category);
router.post('/checkout', isLoginPlayer, checkout);
router.get('/transaction-history', isLoginPlayer, transactionHistory);
router.get('/transaction-history/:id/detail', isLoginPlayer, historyDetail);
router.get('/dashboard', isLoginPlayer, dashboard);

module.exports = router;
