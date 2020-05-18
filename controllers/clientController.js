const { validationResult } = require('express-validator');
const User = require('../models/user');
const Roles = require('../models/roles');
const MESSAGE = require('../utils/strings');

exports.addClient = async (req, res, next) => {
  const { firstName, lastName, email, mobileNumber, address } = req.body;
  const defaultClientRole = 'USER';
  let responseJson = {
    success: false,
    message: '',
    data: null
  }

  const error = validationResult(req);
  if (!error.isEmpty()) {
    responseJson.error = error.errors;
    responseJson.message = MESSAGE.auth.validationFailed;
    res.status(422).json(responseJson);
  } else {
    let userExistsByEmail = await User.findOne({ email });
    let userRole = await Roles.findOne({ role: defaultClientRole });

    if (userExistsByEmail) {
      responseJson.message = userExistsByEmail ? MESSAGE.auth.userExists('email') : MESSAGE.auth.userExists('username')
      userExistsByEmail ? responseJson.error = { email } : responseJson.error = { userName }
      res.status(422).json(responseJson);
    }

    let userName = email.split('@');
    userName = userName[0];
    let createClient = new User({ firstName, lastName, email, mobileNumber, address, userName, role: userRole._id });
    let clientCreated = await createClient.save();
    if (clientCreated) {
      responseJson.success = true;
      responseJson.data = clientCreated;
      responseJson.message = MESSAGE.client.newClientAdded;
      res.status(200).json(responseJson);
    }
  }
}