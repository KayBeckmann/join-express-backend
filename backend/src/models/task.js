const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Task = sequelize.define('task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('idee', 'bearbeitung', 'prüfen', 'fertig'),
    defaultValue: 'idee'
  },
  priority: {
    type: DataTypes.ENUM('hoch', 'mittel', 'niedrig'),
    defaultValue: 'mittel'
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  assignee_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  due_date: DataTypes.DATEONLY
});

module.exports = Task;