const Equipment = require('../models/Equipment');

exports.createEquipment = async (req, res, next) => {
  try {
    const { name, quantity, status } = req.body;
    const created = await Equipment.create({ name, quantity, status });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

exports.getAllequipment = async (req, res, next) => {
  try {
    const items = await Equipment.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.getEquipmentById = async (req, res, next) => {
  try {
    const item = await Equipment.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.updateEquipment = async (req, res, next) => {
  try {
    const updated = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteEquipment = async (req, res, next) => {
  try {
    const deleted = await Equipment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    next(error);
  }
};
