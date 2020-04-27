const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics');

// api/analytics
router.get('/', analyticsController.analytics);
router.get('/overview', analyticsController.overview);

module.exports = router;
