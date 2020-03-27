const mongoose = require('mongoose');
const uuid = require('uuid');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
  }
});

module.exports = mongoose.model('User', userSchema);