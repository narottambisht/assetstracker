const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
  role: {
    type: Schema.Types.String,
    enum: ['USER', 'ADMIN', 'AGENT'],
    required: true
  }
});

const Roles = mongoose.model('Roles', rolesSchema, 'roles')
module.exports = Roles;