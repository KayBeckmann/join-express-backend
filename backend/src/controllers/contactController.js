const ContactService = require('../services/contactService');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await ContactService.getUserContacts(req.userId);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createContact = async (req, res) => {
  try {
    const contact = await ContactService.createContact(req.userId, req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const success = await ContactService.updateContact(
      req.params.id,
      req.userId,
      req.body
    );
    
    success 
      ? res.json({ message: 'Contact updated' })
      : res.status(404).json({ message: 'Contact not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const success = await ContactService.deleteContact(
      req.params.id,
      req.userId
    );
    
    success 
      ? res.json({ message: 'Contact deleted' })
      : res.status(404).json({ message: 'Contact not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};