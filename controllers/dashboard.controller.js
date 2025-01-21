const { Task } = require('../models');
const { Op } = require('sequelize');

exports.getDashboardData = async (req, res) => {
  try {
    // 1. Wie viele Tasks insgesamt?
    const totalTasks = await Task.count();

    // 2. Wie viele mit hoher Priorität?
    const highPriorityCount = await Task.count({
      where: { priority: 'hoch' }
    });

    // 3. Wann ist das nächste Fälligkeitsdatum?
    // Wir nehmen an, dass es Tasks gibt, die ein dueDate haben. 
    // Der nächste Fälligkeitstermin ist der minimalste Wert von dueDate, der in der Zukunft liegt
    const nextDueTask = await Task.findOne({
      where: {
        dueDate: {
          [Op.gt]: new Date()
        }
      },
      order: [['dueDate', 'ASC']]
    });
    const nextDueDate = nextDueTask ? nextDueTask.dueDate : null;

    return res.status(200).json({
      totalTasks,
      highPriorityCount,
      nextDueDate
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fehler beim Abrufen der Dashboard-Daten.' });
  }
};
