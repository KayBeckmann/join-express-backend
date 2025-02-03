const AuthService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const user = await AuthService.registerUser(req.body.username, req.body.password);
    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await AuthService.loginUser(req.body.username, req.body.password);
    res.json({ token, userId: req.user.id });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};