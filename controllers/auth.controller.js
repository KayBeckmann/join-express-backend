const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    return res.status(201).json({ message: 'Benutzer erfolgreich registriert.', userId: newUser.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fehler bei der Registrierung.', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden.' });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: 'Passwort stimmt nicht.' });
    }

    // Token erstellen
    const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login erfolgreich.',
      token,
      userId: user.id,
      username: user.username
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fehler beim Login.', error: error.message });
  }
};
