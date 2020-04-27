const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// api/auth
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
