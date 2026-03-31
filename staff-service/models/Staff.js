const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
{
  name: { type: String, required: true },
  role: { type: String, required: true },
  contact: { type: String, required: true },
  availability: { type: Boolean, required: true },
},
  { timestamps: true }
);

module.exports = mongoose.model('Staff', staffSchema, 'staff');
