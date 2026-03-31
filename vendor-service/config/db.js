const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not set. Please configure it in your .env file.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Vendor Service connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB Atlas connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
