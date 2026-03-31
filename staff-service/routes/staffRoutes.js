const express = require('express');
const {
  createStaff,
  getAllstaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} = require('../controllers/staffController');

const router = express.Router();

router.route('/')
  .post(createStaff)
  .get(getAllstaff);

router.route('/:id')
  .get(getStaffById)
  .put(updateStaff)
  .delete(deleteStaff);

module.exports = router;
