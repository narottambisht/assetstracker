const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authenticateToken = require('../policies/authenticateToken');
const validators = require('../utils/validators');

router.put('/client/add', authenticateToken, validators.validateSignupPayload(), clientController.addClient);

module.exports = router;