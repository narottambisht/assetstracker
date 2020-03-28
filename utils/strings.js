const MESSAGE = {
  auth: {
    userExists: (existingFieldName) => `User already exists with this ${existingFieldName}..!!`,
    userCreated: `Registration Succesfull`,
    invalidUsername: 'Username doesn\'t exists',
    invalidPassword: 'Invalid password must be atleast 5 digits',
    invalidEmail: 'Invalid email',
    validationFailed: 'Validation Failed'
  }
}

module.exports = MESSAGE;