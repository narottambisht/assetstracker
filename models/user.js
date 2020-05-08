const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // firstName: {
  //   type: Schema.Types.String,
  // },
  // lastName: {
  //   type: Schema.Types.String,
  // },
  // mobileNumber: {
  //   type: Schema.Types.String,
  // },
  // address: {
  //   type: Schema.Types.String,
  // },
  userName: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Roles',
    required: true
  },
  token: {
    type: String,
  }
});

/**
 * Hash the password before saving the user model
 */
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

/**
 * Generate an auth token for the user
 */
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = JWT.sign({ _id: user._id }, process.env.JWT_KEY)
  user.token = token
  await user.save()
  return token
}

/**
 * Search for a user by email and password.
 */
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    return null;
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    return null;
  }
  return user
}

const User = mongoose.model('User', userSchema)
module.exports = User;