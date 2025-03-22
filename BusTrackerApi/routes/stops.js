const express = require('express');
const router = express.Router();
const stopController = require('../controllers/stopsController');

router.get('/fetch', stopController.fetchAndSaveStops);
router.post('/fetch', stopController.createStop);
router.get('/', stopController.getAllStops);

router.get('/id/:id', stopController.getStopById);
router.get('/stpid/:sid', stopController.getStopByStpid);

router.put('/id/:id', stopController.updateStop);
router.delete('/id/:id', stopController.deleteStop);

module.exports = router;