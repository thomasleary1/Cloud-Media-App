const { createUser, findUserByEmail, matchPassword } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await findUserByEmail(email);

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await createUser(username, email, password);

    if (user) {
      res.status(201).json({
        username: user.username,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user && (await matchPassword(password, user.password))) {
    res.json({
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

module.exports = {
  registerUser,
  authUser,
};