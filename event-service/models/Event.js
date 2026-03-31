const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
{
  name: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  budget: { type: Number, required: true },
  status: { type: String, required: true },
},
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema, 'events');
