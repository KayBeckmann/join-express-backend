const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    console.log('Kein Token bereitgestellt');
    return res.status(401).json({ message: 'Kein Token, Zugriff verweigert' });
  }

  try {
    console.log('Empfangener Token:', token);  // Debug-Log hinzufügen
    const tokenParts = token.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      console.log('Falsches Token-Format');
      return res.status(401).json({ message: 'Falsches Token-Format' });
    }

    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    console.log('Token erfolgreich verifiziert:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token ungültig:', err.message);
    res.status(401).json({ message: 'Token ungültig' });
  }
};
