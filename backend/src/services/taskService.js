const { Task, SubTask, Category, User } = require('../models');

class TaskService {
  static async getTasks(userId, assignedOnly = false) {
    return Task.findAll({
      where: assignedOnly ? { assignee_id: userId } : {},
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'username']
        }
      ]
    });
  }

  static async getTaskDetails(taskId) {
    return Task.findByPk(taskId, {
      include: [
        {
          model: SubTask,
          as: 'subtasks'
        },
        {
          model: User,
          as: 'assignee'
        },
        {
          model: Category,
          as: 'category'
        }
      ]
    });
  }
}