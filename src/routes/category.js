const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const uploader = require('../middleware/uploader');

// api/category/
router.get('/', categoryController.getCategoryList);
router.get('/:id', categoryController.getById);
router.patch('/:id', uploader.single('image'), categoryController.update); // 'image' - body parameter for upload image data
router.delete('/:id', categoryController.delete);
router.post('/', uploader.single('image'), categoryController.create); // 'image' - body parameter for upload image data

module.exports = router;
