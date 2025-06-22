const errorMessages = {
  auth: {
    invalidCredentials: "Invalid email or password",
    unauthorized: "You must be logged in first",
    forbidden: "You do not have permission to perform this action",
  },
  user: {
    emailExists: "Email is already in use",
    notFound: "User not found",
    name: "name should be 3 letters or more",
    email: "You enterd invalid email",
    password: "password shoild be 6 letters or more",
  },
  general: {
    serverError: "A server error occurred, please try again later",
  },
};

module.exports = errorMessages;
