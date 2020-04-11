const Roles = require('../models/roles');
const { rolesArr } = require('./constants');

async function bootStraping() {
  const roleCount = await Roles.countDocuments();
  if (roleCount <= 0) {
    rolesArr.forEach(async (role) => {
      const roles = new Roles({ role });
      const rolesResult = await roles.save();
      if (rolesResult)
        console.log("bootStraping -> rolesResult", rolesResult);
    });
  }
}

module.exports = { bootStraping };