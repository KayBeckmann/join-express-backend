const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Contact = sequelize.define('contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  address: DataTypes.STRING,
  company: DataTypes.STRING,
  birthday: DataTypes.DATEONLY,
  notes: DataTypes.TEXT
});

module.exports = Contact;