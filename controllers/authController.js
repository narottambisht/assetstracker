const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const MESSAGE = require('../utils/strings');
const User = require('../models/user');

exports.validateSignupPayload = () => {
  return [
    body('userName', MESSAGE.auth.invalidUsername).exists(),
    body('email', MESSAGE.auth.invalidEmail).exists().isEmail(),
    body('password', MESSAGE.auth.invalidPassword).exists().isLength({ min: 5 })
  ]
}

exports.userSignup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  let responseJson = {
    success: false,
    data: req.body
  }
  const error = validationResult(req);
  if (!error.isEmpty()) {
    responseJson.error = error.errors;
    responseJson.message = MESSAGE.auth.validationFailed;
    res.status(422).json(responseJson);
  } else {
    let userExistsByEmail = await User.findOne({ email });
    let userExistsByUsername = await User.findOne({ userName });

    if (userExistsByEmail || userExistsByUsername) {
      responseJson.message = userExistsByEmail ? MESSAGE.auth.userExists('email') : MESSAGE.auth.userExists('userName')
      userExistsByEmail ? responseJson.error = { email } : responseJson.error = { userName }
      res.status(422).json(responseJson);
    } else {
      let bcryptPassword = await bcrypt.hash(password, 12);
      const user = new User({ userName, email, password: bcryptPassword });
      let userResult = await user.save();
      if (userResult) {
        responseJson.success = true;
        responseJson.data = userResult;
        responseJson.message = MESSAGE.auth.userCreated;
        res.status(200).json(responseJson);
      }
    }
  }
}