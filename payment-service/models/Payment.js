const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
{
  eventId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
},
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema, 'payments');
