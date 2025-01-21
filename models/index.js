const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config.js');

// Sequelize-Instanz erstellen
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
});

// Modelle einbinden
const User = require('./user.model')(sequelize);
const Contact = require('./contact.model')(sequelize);
const Task = require('./task.model')(sequelize);
const SubTask = require('./subtask.model')(sequelize);

// Beziehungen definieren
// Beispiel: Ein User kann mehrere Tasks haben, Task gehört "Sachbearbeitern" (N:M)
User.belongsToMany(Task, { through: 'UserTask', as: 'tasks' });
Task.belongsToMany(User, { through: 'UserTask', as: 'users' });

// SubTask: gehört zu Task (1:N)
Task.hasMany(SubTask, { as: 'subtasks' });
SubTask.belongsTo(Task);

// Jeder User ist auch ein Contact (optionale 1:1-Beziehung, je nach Modellierung)
// Oder jeder User hat seine eigenen Contact-Datensätze. Hier als Beispiel "belongsTo"
User.hasOne(Contact, { as: 'contactDetails', foreignKey: 'userId' });
Contact.belongsTo(User);

// Datenbank synchronisieren (nicht in Produktion mit force: true!)
sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('Datenbank synchronisiert.');
  })
  .catch(err => {
    console.error('Fehler bei der DB-Synchronisation:', err);
  });

module.exports = {
  sequelize,
  User,
  Contact,
  Task,
  SubTask,
};
