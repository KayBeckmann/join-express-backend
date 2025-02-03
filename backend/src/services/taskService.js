const { Task, SubTask, Category, User } = require('../models');

class TaskService {
  static async getTasks(userId, assignedOnly = false) {
    const whereClause = assignedOnly ? { assignee_id: userId } : {};
    
    return Task.findAll({
      where: whereClause,
      attributes: ['id', 'title', 'status', 'priority', 'due_date'],
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
  }

  static async createTask(userId, taskData) {
    const task = await Task.create({
      ...taskData,
      creator_id: userId
    });

    if (taskData.subTasks && taskData.subTasks.length > 0) {
      await SubTask.bulkCreate(
        taskData.subTasks.map(st => ({
          ...st,
          task_id: task.id
        }))
      );
    }

    return task;
  }

  static async updateTask(taskId, updateData) {
    const [affectedCount] = await Task.update(updateData, {
      where: { id: taskId }
    });
    return affectedCount > 0;
  }

  static async updateSubTaskStatus(subTaskId, status) {
    const [affectedCount] = await SubTask.update(
      { status },
      { where: { id: subTaskId } }
    );
    return affectedCount > 0;
  }
}

module.exports = TaskService;