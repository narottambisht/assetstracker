const MESSAGE = require('../utils/strings');

const isRoleAgent = (req, res, next) => {
  if (req.user.role.role === 'AGENT') {
    next();
  } else {
    let responseJson = {
      status: false,
      message: MESSAGE.client.invalidRole,
      data: req.body
    }
    res.status(422).send(responseJson);
  }
}

module.exports = isRoleAgent;