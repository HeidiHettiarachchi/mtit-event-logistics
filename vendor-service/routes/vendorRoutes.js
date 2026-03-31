const express = require('express');
const {
  createVendor,
  getAllvendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} = require('../controllers/vendorController');

const router = express.Router();

router.route('/')
  .post(createVendor)
  .get(getAllvendors);

router.route('/:id')
  .get(getVendorById)
  .put(updateVendor)
  .delete(deleteVendor);

module.exports = router;
