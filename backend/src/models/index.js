const User = require('./user');
const Contact = require('./contact');
const Task = require('./task');
const SubTask = require('./subtask');
const Category = require('./category');

// User <-> Contact (1:n)
User.hasMany(Contact, { foreignKey: 'user_id' });
Contact.belongsTo(User, { foreignKey: 'user_id' });

// Task <-> SubTask (1:n)
Task.hasMany(SubTask, { foreignKey: 'task_id' });
SubTask.belongsTo(Task, { foreignKey: 'task_id' });

// Category <-> Task (1:n)
Category.hasMany(Task, { foreignKey: 'category_id' });
Task.belongsTo(Category, { foreignKey: 'category_id' });

// User <-> Task (Assignee)
User.hasMany(Task, { foreignKey: 'assignee_id' });
Task.belongsTo(User, { foreignKey: 'assignee_id', as: 'assignee' });

// User <-> Task (Creator)
User.hasMany(Task, { foreignKey: 'creator_id' });
Task.belongsTo(User, { foreignKey: 'creator_id', as: 'creator' });

module.exports = {
  User,
  Contact,
  Task,
  SubTask,
  Category
};