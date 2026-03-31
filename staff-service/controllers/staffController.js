const Staff = require('../models/Staff');

exports.createStaff = async (req, res, next) => {
  try {
    const { name, role, contact, availability } = req.body;
    const created = await Staff.create({ name, role, contact, availability });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

exports.getAllstaff = async (req, res, next) => {
  try {
    const items = await Staff.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.getStaffById = async (req, res, next) => {
  try {
    const item = await Staff.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.updateStaff = async (req, res, next) => {
  try {
    const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteStaff = async (req, res, next) => {
  try {
    const deleted = await Staff.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.json({ message: 'Staff deleted successfully' });
  } catch (error) {
    next(error);
  }
};
