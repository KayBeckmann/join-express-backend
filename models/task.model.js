const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    priority: {
      type: DataTypes.STRING, // z.B. 'hoch', 'mittel', 'niedrig'
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('geplant', 'bearbeitung', 'prüfen', 'fertig'),
      defaultValue: 'geplant',
      allowNull: false
    }
  }, {
    tableName: 'tasks',
  });

  return Task;
};
