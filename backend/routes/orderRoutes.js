const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');

const auth = require('../middleware/authMiddleware');

// Authenticated user routes
router.post('/', auth, placeOrder);
router.get('/user', auth, getUserOrders);

// Admin routes (later restrict with role check)
router.get('/', auth, getAllOrders);
router.put('/:id/status', auth, updateOrderStatus);

module.exports = router;
