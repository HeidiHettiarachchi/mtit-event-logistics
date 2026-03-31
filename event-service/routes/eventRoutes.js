const express = require('express');
const {
  createEvent,
  getAllevents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

const router = express.Router();

router.route('/')
  .post(createEvent)
  .get(getAllevents);

router.route('/:id')
  .get(getEventById)
  .put(updateEvent)
  .delete(deleteEvent);

module.exports = router;
