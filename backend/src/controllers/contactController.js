const { Contact, User } = require('../models');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'first_name', 'last_name', 'email', 'phone']
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      user_id: req.userId,
      ...req.body
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const [updated] = await Contact.update(req.body, {
      where: { id: req.params.id, user_id: req.userId }
    });
    updated ? res.json({ message: 'Contact updated' }) : res.status(404).json({ message: 'Contact not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.destroy({
      where: { id: req.params.id, user_id: req.userId }
    });
    deleted ? res.json({ message: 'Contact deleted' }) : res.status(404).json({ message: 'Contact not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};