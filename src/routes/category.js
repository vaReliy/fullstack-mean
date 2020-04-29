const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

// api/category/
router.get('/', categoryController.getCategoryList);
router.get('/:id', categoryController.getById);
router.patch('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);
router.post('/', categoryController.create);

module.exports = router;
