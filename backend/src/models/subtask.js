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

// Beziehung zum Task
SubTask.belongsTo(require('./task'), {
  foreignKey: 'task_id',
  as: 'task'
});

module.exports = SubTask;