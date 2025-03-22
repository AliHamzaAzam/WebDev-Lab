const express = require('express');
const router = express.Router();
const routesController = require('../controllers/routesController');

router.get('/fetch', routesController.fetchAndSaveRoutes);
router.post('/', routesController.createRoute);
router.get('/', routesController.getAllRoutes);

router.get('/id/:id', routesController.getRouteById);
router.get('/rt/:rt', routesController.getRouteByRt);

router.put('/id/:id', routesController.updateRoute);
router.delete('/id/:id', routesController.deleteRoute);

module.exports = router;