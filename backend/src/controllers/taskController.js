const TaskService = require('../services/taskService');

exports.getTasks = async (req, res) => {
  try {
    const assignedOnly = req.query.assignedOnly === 'true';
    const tasks = await TaskService.getTasks(req.userId, assignedOnly);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskDetails = async (req, res) => {
  try {
    const task = await TaskService.getTaskDetails(req.params.id);
    task 
      ? res.json(task)
      : res.status(404).json({ message: 'Task not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await TaskService.createTask(req.userId, {
      ...req.body,
      subtasks: req.body.subtasks || []
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const success = await TaskService.updateTask(req.params.id, req.body);
    success 
      ? res.json({ message: 'Task updated' })
      : res.status(404).json({ message: 'Task not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSubTask = async (req, res) => {
  try {
    const success = await TaskService.updateSubTaskStatus(
      req.params.subTaskId,
      req.body.status
    );
    
    success 
      ? res.json({ message: 'Subtask updated' })
      : res.status(404).json({ message: 'Subtask not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};