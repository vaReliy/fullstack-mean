const express = require('express');
const router = express.Router();
const positionController = require('../controllers/position');

// api/auth/position
router.get('/:categoryId', positionController.get);
router.patch('/:id', positionController.update);
router.post('/', positionController.create);
router.delete('/:id', positionController.delete);

module.exports = router;
