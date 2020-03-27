const { body, validationResult } = require('express-validator')

exports.validateSignupPayload = (req, res, next) => {
  return [
    body('userName', 'userName doesnt exists').exists(),
    body('email', 'Invalid email').exists().isEmail(),
    body('password', '').exists().isLength({ min: 5 })
  ]
}

exports.userSignup = (req, res, next) => {
  const errors = validationResult(req)
  console.log('req object ***', req.body);
  console.log('errors', errors);
}