const express = require('express');
const router = express.Router();
const directionController = require('../controllers/directionsController');

router.get('/fetch', directionController.fetchAndSaveDirections);
router.post('/', directionController.createDirection);
router.get('/', directionController.getAllDirections);

router.get('/id/:id', directionController.getDirectionById);

router.put('/id/:id', directionController.updateDirection);
router.delete('/id/:id', directionController.deleteDirection);


module.exports = router;