const MESSAGE = {
  auth: {
    userExists: (existingFieldName) => `User already exists with this ${existingFieldName}..!!`,
    userCreated: `Registration Succesfull`,
    invalidUsername: 'Username doesn\'t exists',
    invalidPassword: 'Invalid password must be atleast 5 digits',
    invalidEmail: 'Invalid email',
    validationFailed: 'Validation Failed',
    invalidCred: "Login failed. Invalid Credentials !!",
    loginSuccess: "User logged in successfully",
    tokenAuthSuccess: "User Authenticated",
    tokenAuthFailure: "Failed to authenticate Token! Please login again."
  },
  misc: {
    profileUpdated: 'Your profile has been updated successfully!',
    updateProfileFailed: "Sorry we couldn't update your profile, please try again!"
  }
}

module.exports = MESSAGE;