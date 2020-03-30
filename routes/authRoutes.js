const express = require('express');
const router = express.Router();
const validators = require('../utils/validators');
const authController = require('../controllers/authController');

router.post('/signup', validators.validateSignupPayload(), authController.userSignup);
router.post('/login', validators.validateLoginPayload(), authController.userLogin);

module.exports = router;