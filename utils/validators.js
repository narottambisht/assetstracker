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

exports.validateAddClientPayload = () => {
  return [
    body('email', MESSAGE.auth.invalidEmail).exists().isEmail(),
    body('firstName', MESSAGE.misc.emptyFields).isLength({ min: 1 }),
    body('lastName', MESSAGE.misc.emptyFields).isLength({ min: 1 }),
    body('mobileNumber', MESSAGE.misc.validMobileNumber).isMobilePhone(),
    body('address', MESSAGE.misc.emptyFields).isLength({ min: 1 })
  ]
}