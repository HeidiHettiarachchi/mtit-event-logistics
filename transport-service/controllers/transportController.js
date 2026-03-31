const Transport = require('../models/Transport');

exports.createTransport = async (req, res, next) => {
  try {
    const { vehicleType, driverName, availability } = req.body;
    const created = await Transport.create({ vehicleType, driverName, availability });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

exports.getAlltransport = async (req, res, next) => {
  try {
    const items = await Transport.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.getTransportById = async (req, res, next) => {
  try {
    const item = await Transport.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Transport not found' });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.updateTransport = async (req, res, next) => {
  try {
    const updated = await Transport.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Transport not found' });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteTransport = async (req, res, next) => {
  try {
    const deleted = await Transport.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Transport not found' });
    }

    res.json({ message: 'Transport deleted successfully' });
  } catch (error) {
    next(error);
  }
};
