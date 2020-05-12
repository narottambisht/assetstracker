const MESSAGE = require('../utils/strings');

exports.updateProfile = async (req, res, next) => {
  const { firstName, lastName, mobileNumber, address } = req.body;
  let responseJson = {
    success: true,
    message: ''
  }
  try {
    const user = req.user;
    user.firstName = firstName;
    user.lastName = lastName;
    user.mobileNumber = mobileNumber;
    user.address = address
    let updatedUser = await user.save();
    responseJson.data = updatedUser;
    responseJson.message = MESSAGE.misc.profileUpdated;
    res.status(200).send(responseJson)
  } catch (error) {
    responseJson.success = false;
    responseJson.message = MESSAGE.misc.updateProfileFailed;
    responseJson.data = req.body;
    res.status(400).send(responseJson);
  }
}