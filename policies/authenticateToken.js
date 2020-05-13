const JWT = require('jsonwebtoken');
const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '')
  try {
    const data = JWT.verify(token, process.env.JWT_KEY)
    const user = await User.findOne({ _id: data._id, token: token });
    await user.populate('role', ['role']).execPopulate();
    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' })
  }
}

module.exports = authenticateToken