const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Kein Token vorhanden.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY'); // SECRET_KEY anpassen / aus ENV laden
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Ungültiger Token - User existiert nicht.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Ungültiger Token.', error: err.message });
  }
};

module.exports = authMiddleware;
