const JWT = require('jsonwebtoken');
const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
    const data = JWT.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ _id: data._id, token: token });
    await user.populate('role', ['role']).execPopulate();
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource. Check your Authorisation token' });
  }
}

module.exports = authenticateToken