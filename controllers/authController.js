const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.validateSignupPayload = (req, res, next) => {
  return [
    body('userName', 'userName doesnt exists').exists(),
    body('email', 'Invalid email').exists().isEmail(),
    body('password', 'Invalid password must be atleast 5 digits').exists().isLength({ min: 5 })
  ]
}

exports.userSignup = (req, res, next) => {
  const { userName, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = {
      status: false,
      msg: "Validation Failed",
      errors: errors.errors,
      data: req.body
    }

    res.status(422).json(response);
  } else {
    const user = new User({ userName, email, password });
    user.save()
      .then(result => {
        console.log('result for save ****', result);
      }).catch(err => {
        console.log('error**', err);
      });
  }
}