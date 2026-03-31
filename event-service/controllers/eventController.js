const Event = require('../models/Event');

exports.createEvent = async (req, res, next) => {
  try {
    const { name, location, date, budget, status } = req.body;
    const created = await Event.create({ name, location, date, budget, status });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

exports.getAllevents = async (req, res, next) => {
  try {
    const items = await Event.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const item = await Event.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};
