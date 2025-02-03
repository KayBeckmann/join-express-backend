const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class AuthService {
  static async registerUser(username, password) {
    try {
      return await User.create({ username, password });
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  static async loginUser(username, password) {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    return jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }
}

module.exports = AuthService;