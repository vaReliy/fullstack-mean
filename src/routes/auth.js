const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// api/auth/login
router.post('/login', authController.login);
// api/auth/register
router.post('/register', authController.register);

module.exports = router;
