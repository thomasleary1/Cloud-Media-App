const users = [];

const createUser = async (username, email, password) => {
  const user = { id: users.length + 1, username, email, password };
  users.push(user);
  return user;
};

const findUserByEmail = async (email) => {
  return users.find(user => user.email === email);
};

const matchPassword = async (enteredPassword, storedPassword) => {
  return enteredPassword === storedPassword;
};

module.exports = {
  createUser,
  findUserByEmail,
  matchPassword,
};