const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authenticateToken = require('../policies/authenticateToken');
const isRoleAgent = require('../policies/isRoleAgent');
const validators = require('../utils/validators');

router.put('/add', authenticateToken, isRoleAgent, validators.validateAddClientPayload(), clientController.addClient);

module.exports = router;