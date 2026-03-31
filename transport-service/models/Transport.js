const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema(
{
  vehicleType: { type: String, required: true },
  driverName: { type: String, required: true },
  availability: { type: Boolean, required: true },
},
  { timestamps: true }
);

module.exports = mongoose.model('Transport', transportSchema, 'transport');
