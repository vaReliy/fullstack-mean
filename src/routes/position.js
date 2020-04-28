const express = require('express');
const router = express.Router();
const positionController = require('../controllers/position');

// api/position
router.get('/:categoryId', positionController.getByCategory);
router.patch('/:id', positionController.update);
router.post('/', positionController.create);
router.delete('/:id', positionController.delete);

module.exports = router;
