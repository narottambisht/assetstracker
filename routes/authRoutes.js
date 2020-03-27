const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.validateSignupPayload(), authController.userSignup);

module.exports = router;