const express = require('express');
const router = express.Router();
const patternController = require('../controllers/patternsController');

router.get('/fetch', patternController.fetchAndSavePatterns);
router.post('/', patternController.createPattern);
router.get('/', patternController.getAllPatterns);

router.get('/id/:id', patternController.getPatternById);
router.get('/pid/:pid', patternController.getPatternByPid);

router.put('/id/:id', patternController.updatePattern);
router.delete('/id/:id', patternController.deletePattern);

module.exports = router;