const Order = require('../models/Order');

// @route   POST /api/orders
exports.placeOrder = async (req, res) => {
  const { items, totalAmount, deliveryAddress } = req.body;

  try {
    const newOrder = new Order({
      user: req.user.id,
      items,
      totalAmount,
      deliveryAddress
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ msg: 'Failed to place order' });
  }
};

// @route   GET /api/orders/user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.food');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Error retrieving orders' });
  }
};

// @route   GET /api/orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.food');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Error retrieving all orders' });
  }
};

// @route   PUT /api/orders/:id/status (admin)
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    res.json(order);
  } catch (err) {
    res.status(400).json({ msg: 'Error updating order status' });
  }
};
