const { body, validationResult } = require('express-validator');
const MESSAGE = require('../utils/strings');
const User = require('../models/user');

exports.userSignup = async (req, res, next) => {
  const { userName, email } = req.body;
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
      responseJson.message = userExistsByEmail ? MESSAGE.auth.userExists('email') : MESSAGE.auth.userExists('username')
      userExistsByEmail ? responseJson.error = { email } : responseJson.error = { userName }
      res.status(422).json(responseJson);
    } else {
      const user = new User(req.body);
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

exports.userLogin = async (req, res, next) => {
  console.log('LOGIN REQUEST');
  const { email, password } = req.body;
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
    const user = await User.findByCredentials(email, password)
    if (!user) {
      responseJson.message = MESSAGE.auth.invalidCred;
      res.status(422).json(responseJson);
    } else {
      const token = await user.generateAuthToken();
      responseJson.success = true
      responseJson.data.token = token;
      responseJson.message = MESSAGE.auth.loginSuccess;
      res.status(200).json(responseJson);
    }
  }

}