const { validationResult } = require('express-validator');
const MESSAGE = require('../utils/strings');
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const Roles = require('../models/roles');

exports.userSignup = async (req, res, next) => {
  const { userName, email, role, password } = req.body;
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
    let userRole = await Roles.findOne({ role });

    if (userExistsByEmail || userExistsByUsername) {
      responseJson.message = userExistsByEmail ? MESSAGE.auth.userExists('email') : MESSAGE.auth.userExists('username')
      userExistsByEmail ? responseJson.error = { email } : responseJson.error = { userName }
      res.status(422).json(responseJson);
    } else {
      const user = new User({ userName, email, password, role: userRole._id });
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
  const { email, password } = req.body;
  let responseJson = {
    success: false,
    data: req.body
  }
  const error = validationResult(req);
  if (!error.isEmpty()) {
    responseJson.error = error.errors;
    responseJson.message = MESSAGE.auth.validationFailed;
    res.status(422).json(responseJson)
  } else {
    const user = await User.findByCredentials(email, password);

    if (!user) {
      responseJson.message = MESSAGE.auth.invalidCred;
      res.status(422).json(responseJson);
    } else {
      const token = await user.generateAuthToken();
      await user.populate('role', ['role']).execPopulate();
      responseJson.data = user;
      responseJson.success = true
      responseJson.data.token = token;
      responseJson.message = MESSAGE.auth.loginSuccess;
      res.status(200).json(responseJson);
    }
  }
}

exports.authenticateToken = async (req, res, next) => {
  const { token } = req.body;
  let responseJson = {
    success: true,
    message: MESSAGE.auth.tokenAuthSuccess,
  }
  try {
    let jwtVerificationResult = JWT.verify(token, process.env.JWT_KEY)
    const findUser = await User.findById(jwtVerificationResult._id);
    await findUser.populate('role', ['role']).execPopulate();
    responseJson.data = findUser;
    res.status(200).send(responseJson);
  } catch (error) {
    responseJson.success = false;
    responseJson.message = MESSAGE.auth.tokenAuthFailure;
    responseJson.data = req.body;
    res.status(422).send(responseJson);
  }
}