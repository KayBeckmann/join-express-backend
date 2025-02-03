const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Contact = sequelize.define('contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  address: DataTypes.STRING,
  company: DataTypes.STRING,
  birthday: DataTypes.DATEONLY,
  notes: DataTypes.TEXT
});

// Beziehung zum User
Contact.belongsTo(require('./user'), {
  foreignKey: 'user_id',
  as: 'user'
});

module.exports = Contact;