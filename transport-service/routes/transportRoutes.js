const express = require('express');
const {
  createTransport,
  getAlltransport,
  getTransportById,
  updateTransport,
  deleteTransport,
} = require('../controllers/transportController');

const router = express.Router();

router.route('/')
  .post(createTransport)
  .get(getAlltransport);

router.route('/:id')
  .get(getTransportById)
  .put(updateTransport)
  .delete(deleteTransport);

module.exports = router;
