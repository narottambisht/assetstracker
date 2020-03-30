const { body } = require('express-validator');
const MESSAGE = require('../utils/strings');

exports.validateSignupPayload = () => {
  return [
    body('userName', MESSAGE.auth.invalidUsername).exists(),
    body('email', MESSAGE.auth.invalidEmail).exists().isEmail(),
    body('password', MESSAGE.auth.invalidPassword).exists().isLength({ min: 5 })
  ]
}

exports.validateLoginPayload = () => {
  return [
    body('email', MESSAGE.auth.invalidEmail).exists().isEmail(),
    body('password', MESSAGE.auth.invalidPassword).exists().isLength({ min: 5 })
  ]
}