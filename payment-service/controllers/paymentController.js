const Payment = require('../models/Payment');

exports.createPayment = async (req, res, next) => {
  try {
    const { eventId, amount, status } = req.body;
    const created = await Payment.create({ eventId, amount, status });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

exports.getAllpayments = async (req, res, next) => {
  try {
    const items = await Payment.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.getPaymentById = async (req, res, next) => {
  try {
    const item = await Payment.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deletePayment = async (req, res, next) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    next(error);
  }
};
