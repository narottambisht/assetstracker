const express = require('express');
const router = express.Router();
const miscController = require('../controllers/miscController');
const auth = require('../policies/authenticateToken');

router.put('/updateprofile', auth, miscController.updateProfile);

module.exports = router;