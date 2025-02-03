const { Task, SubTask, User, Category } = require('../models');

// Task-Übersicht (gekürzte Version)
exports.getTasks = async (req, res) => {
  try {
    const whereClause = req.query.assignedOnly 
      ? { assignee_id: req.userId } 
      : {};

    const tasks = await Task.findAll({
      where: whereClause,
      attributes: ['id', 'title', 'status', 'priority', 'due_date'],
      include: [{
        model: User,
        as: 'assignee',
        attributes: ['id', 'username']
      }]
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Task-Detailansicht
exports.getTaskDetails = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [
        {
          model: SubTask,
          attributes: ['id', 'title', 'status']
        },
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'username']
        },
        {
          model: Category,
          attributes: ['id', 'name']
        }
      ]
    });
    
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      creator_id: req.userId
    });
    
    if (req.body.subTasks) {
      await SubTask.bulkCreate(
        req.body.subTasks.map(st => ({ ...st, task_id: task.id }))
      );
    }
    
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id }
    });
    updated ? res.json({ message: 'Task updated' }) : res.status(404).json({ message: 'Task not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Subtask-Controller
exports.updateSubTask = async (req, res) => {
  try {
    const [updated] = await SubTask.update(
      { status: req.body.status },
      { where: { id: req.params.subTaskId } }
    );
    updated ? res.json({ message: 'Subtask updated' }) : res.status(404).json({ message: 'Subtask not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};