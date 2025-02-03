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
  due_date: DataTypes.DATEONLY
});

// Beziehungen
Task.belongsTo(require('./user'), {
  foreignKey: 'assignee_id',
  as: 'assignee'
});

Task.belongsTo(require('./category'), {
  foreignKey: 'category_id',
  as: 'category'
});

Task.belongsTo(require('./user'), {
  foreignKey: 'creator_id',
  as: 'creator'
});

module.exports = Task;