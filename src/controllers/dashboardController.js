const Task = require('../models/Task');
const { Op } = require('sequelize');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalTasks = await Task.count();
    const highPriorityTasks = await Task.count({ where: { priority: 'high' } });
    const nextDueDate = await Task.findOne({
      where: { dueDate: { [Op.gt]: new Date() } },
      order: [['dueDate', 'ASC']]
    });

    res.json({
      totalTasks,
      highPriorityTasks,
      nextDueDate: nextDueDate ? nextDueDate.dueDate : 'Keine Aufgaben gefunden'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
