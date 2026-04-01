const express = require('express');
const {
  createPayment,
  getAllpayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require('../controllers/paymentController');

const router = express.Router();

router.route('/')
  .post(createPayment)
  .get(getAllpayments);

router.route('/:id')
  .get(getPaymentById)
  .put(updatePayment)
  .delete(deletePayment);

module.exports = router;
