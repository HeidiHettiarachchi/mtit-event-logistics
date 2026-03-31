const Vendor = require('../models/Vendor');

exports.createVendor = async (req, res, next) => {
  try {
    const { name, serviceType, contact, availability } = req.body;
    const created = await Vendor.create({ name, serviceType, contact, availability });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

exports.getAllvendors = async (req, res, next) => {
  try {
    const items = await Vendor.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.getVendorById = async (req, res, next) => {
  try {
    const item = await Vendor.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.updateVendor = async (req, res, next) => {
  try {
    const updated = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteVendor = async (req, res, next) => {
  try {
    const deleted = await Vendor.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    next(error);
  }
};
