const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

// api/order
router.get('/', orderController.get);
router.post('/', orderController.create);

module.exports = router;
