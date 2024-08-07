const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');


// Get all orders for a user
router.get('/get-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ orderReceiveDate: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add new order
router.post('/add-order', auth, async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.user.id,
      ...req.body,
      orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
    });
    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update order status
router.patch('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: { deliveryStatus: req.body.deliveryStatus, orderDeliveredOnDate: req.body.deliveryStatus === 'DELIVERED' ? Date.now() : null } },
      { new: true }
    );
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/orderNumber/:orderNumber', auth, async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderNumber: req.params.orderNumber, userId: req.user.id },
      { $set: { deliveryStatus: req.body.deliveryStatus, orderDeliveredOnDate: req.body.deliveryStatus === 'DELIVERED' ? Date.now() : null } },
      { new: true }
    );
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;