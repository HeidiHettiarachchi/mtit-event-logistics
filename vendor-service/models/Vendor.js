const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
{
  name: { type: String, required: true },
  serviceType: { type: String, required: true },
  contact: { type: String, required: true },
  availability: { type: Boolean, required: true },
},
  { timestamps: true }
);

module.exports = mongoose.model('Vendor', vendorSchema, 'vendors');
