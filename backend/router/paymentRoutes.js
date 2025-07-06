const express = require('express');
const router = express.Router();
const {protect,adminOnly} = require('../middleware/authMiddleware');
const {fakePayment} = require('../controller/paymentController');

router.post('/fake-payment', protect, fakePayment);

module.exports = router;