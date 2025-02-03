const { Contact } = require('../models');

class ContactService {
  static async getUserContacts(userId) {
    return Contact.findAll({
      where: { user_id: userId },
      attributes: ['id', 'first_name', 'last_name', 'email', 'phone']
    });
  }

  static async createContact(userId, contactData) {
    return Contact.create({ user_id: userId, ...contactData });
  }

  static async updateContact(contactId, userId, updateData) {
    const [affectedCount] = await Contact.update(updateData, {
      where: { id: contactId, user_id: userId }
    });
    return affectedCount > 0;
  }

  static async deleteContact(contactId, userId) {
    const deletedCount = await Contact.destroy({
      where: { id: contactId, user_id: userId }
    });
    return deletedCount > 0;
  }
}

module.exports = ContactService;