const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: { type: String, required: true },
  customerImage: { type: String },
  orderNumber: { type: String, required: true, unique: true },
  orderReceiveDate: { type: Date, default: Date.now },
  orderDeliveredOnDate: { type: Date },
  deliveryStatus: { type: String, enum: ['PENDING', 'CANCELLED', 'DELIVERED'], default: 'PENDING' },
  actualAmount: { type: Number, required: true },
  soldAtAmount: { type: Number, required: true },
  dishName: { type: String, required: true },
  instructions: { type: String },
});

module.exports = mongoose.model('Order', OrderSchema);