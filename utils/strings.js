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
    tokenAuthFailure: "Failed to authenticate user"
  }
}

module.exports = MESSAGE;