const express = require('express');
const router = express.Router();
const { getBkashToken, createBkashPayment } = require('../services/bkashService');
const auth = require('../middleware/authMiddleware');

// Initiate bKash payment
router.post('/bkash/initiate', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const token = await getBkashToken();
    const payment = await createBkashPayment(amount, token);

    res.json({
      paymentID: payment.paymentID,
      bkashURL: payment.bkashURL
    });
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ msg: 'bKash payment failed' });
  }
});

module.exports = router;
