const { Contact } = require('../models');

exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create({ ...req.body });
    return res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fehler beim Erstellen des Kontakts.', error: error.message });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    return res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fehler beim Abrufen der Kontakte.' });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: 'Kontakt nicht gefunden.' });
    }

    await contact.update(req.body);
    return res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fehler beim Aktualisieren des Kontakts.' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: 'Kontakt nicht gefunden.' });
    }

    await contact.destroy();
    return res.status(200).json({ message: 'Kontakt erfolgreich gelöscht.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fehler beim Löschen des Kontakts.' });
  }
};
