const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const SubTask = sequelize.define('subtask', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = SubTask;