const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SubTask = sequelize.define('SubTask', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'subtasks',
  });

  return SubTask;
};
