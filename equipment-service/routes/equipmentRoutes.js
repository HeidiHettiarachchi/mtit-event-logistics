const express = require('express');
const {
  createEquipment,
  getAllequipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} = require('../controllers/equipmentController');

const router = express.Router();

router.route('/')
  .post(createEquipment)
  .get(getAllequipment);

router.route('/:id')
  .get(getEquipmentById)
  .put(updateEquipment)
  .delete(deleteEquipment);

module.exports = router;
