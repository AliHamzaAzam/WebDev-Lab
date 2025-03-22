const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehiclesController');

router.get('/fetch', vehicleController.fetchAndSaveVehicles);
router.post('/', vehicleController.createVehicle);
router.get('/', vehicleController.getAllVehicles);

router.get('/id/:id', vehicleController.getVehicleById);
router.get('/vid/:vid', vehicleController.getVehicleByVid);

router.put('/id/:id', vehicleController.updateVehicle);
router.delete('/id/:id', vehicleController.deleteVehicle);

module.exports = router;