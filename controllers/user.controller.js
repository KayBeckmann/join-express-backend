const { User, Contact } = require('../models');

exports.getProfile = async (req, res) => {
  try {
    // req.user wird über die Auth Middleware gesetzt
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Contact, as: 'contactDetails' }]
    });
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fehler beim Abrufen der Benutzerdaten.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email, password, contactDetails } = req.body;

    // Benutzer aktualisieren
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden.' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password; // wird in Hooks gehasht

    await user.save();

    // Kontakt aktualisieren oder erstellen
    let userContact = await Contact.findOne({ where: { userId: user.id } });
    if (!userContact) {
      userContact = await Contact.create({ userId: user.id, ...contactDetails });
    } else {
      await userContact.update({ ...contactDetails });
    }

    return res.status(200).json({ message: 'Profil erfolgreich aktualisiert.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fehler beim Aktualisieren des Profils.', error: error.message });
  }
};
