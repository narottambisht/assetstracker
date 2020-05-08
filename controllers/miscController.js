exports.updateProfile = (req, res, next) => {
  const { firstName, lastName, mobileNumber, address } = req.body;
  const user = req.user;

}