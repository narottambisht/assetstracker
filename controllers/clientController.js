const User = require('../models/user');
const MESSAGE = require('../utils/strings');

exports.addClient = async (req, res, next) => {
  const { firstName, lastName, email, mobileNumber, address, userName
  } = req.body;
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
    let userExistsByUsername = await User.findOne({ userName });
    let userRole = await Roles.findOne({ role });

    if (userExistsByEmail || userExistsByUsername) {
      responseJson.message = userExistsByEmail ? MESSAGE.auth.userExists('email') : MESSAGE.auth.userExists('username')
      userExistsByEmail ? responseJson.error = { email } : responseJson.error = { userName }
      res.status(422).json(responseJson);
    }
  }
}