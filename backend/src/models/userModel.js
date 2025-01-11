const sql = require('mssql');
const config = require('../config');

const createUser = async (username, email, password) => {
  const result = await sql.query`INSERT INTO Users (Username, Email, Password) OUTPUT INSERTED.* VALUES (${username}, ${email}, ${password})`;
  return result.recordset[0];
};

const findUserByEmail = async (email) => {
  const result = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
  return result.recordset[0];
};

const matchPassword = async (enteredPassword, storedPassword) => {
  return enteredPassword === storedPassword;
};

module.exports = {
  createUser,
  findUserByEmail,
  matchPassword,
};