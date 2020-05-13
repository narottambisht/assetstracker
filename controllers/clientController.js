const User = require('../models/user');
const MESSAGE = require('../utils/strings');

exports.addClient = (req, res, next) => {
  const { firstName, lastName, email, mobileNumber, address } = req.body;
  let responseJson = {
    success: false,
    message: '',
    data: null
  }

  if (req.user.role.role === 'AGENT') {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      responseJson.error = error.errors;
      responseJson.message = MESSAGE.auth.validationFailed;
      res.status(422).json(responseJson);
    } else {

    }
  }
  responseJson.message = MESSAGE.client.invalidRole;
  responseJson.data = req.body;
  res.status(422).send(responseJson);
}