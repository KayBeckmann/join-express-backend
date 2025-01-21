const { Task, SubTask, User } = require('../models');

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category, priority, status, users, subtasks } = req.body;

    // Task erstellen
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      category,
      priority,
      status
    });

    // Sachbearbeiter (Benutzer) zuweisen (N:M)
    if (users && Array.isArray(users)) {
      const assignedUsers = await User.findAll({ where: { id: users } });
      await newTask.setUsers(assignedUsers);
    }

    // Subtasks anlegen (1:N)
    if (subtasks && Array.isArray(subtasks)) {
      for (let sub of subtasks) {
        await SubTask.create({
          description: sub.description,
          done: sub.done,
          TaskId: newTask.id
        });
      }
    }

    return res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fehler beim Erstellen des Tasks.' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    // Optionaler Filter: tasks für den aktuellen User oder alle
    const { assignedToMe } = req.query;
    
    let tasks;
    if (assignedToMe === 'true') {
      // Tasks, die dem eingeloggten User zugewiesen sind
      tasks = await Task.findAll({
        include: [
          {
            model: SubTask,
            as: 'subtasks'
          },
          {
            model: User,
            as: 'users',
            where: { id: req.user.id }  // Filter
          }
        ]
      });
    } else {
      // Alle Tasks
      tasks = await Task.findAll({
        include: [
          { model: SubTask, as: 'subtasks' },
          { model: User, as: 'users' }
        ]
      });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fehler beim Abrufen der Tasks.' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id, {
      include: [
        { model: SubTask, as: 'subtasks' },
        { model: User, as: 'users' }
      ]
    });

    if (!task) {
      return res.status(404).json({ message: 'Task nicht gefunden.' });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fehler beim Abrufen des Tasks.' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, category, priority, status, users } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task nicht gefunden.' });
    }

    // Taskdaten aktualisieren
    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (category) task.category = category;
    if (priority) task.priority = priority;
    if (status) task.status = status;

    // Benutzerzuweisung
    if (users && Array.isArray(users)) {
      const assignedUsers = await User.findAll({ where: { id: users } });
      await task.setUsers(assignedUsers);
    }

    await task.save();

    return res.status(200).json({ message: 'Task erfolgreich aktualisiert.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fehler beim Aktualisieren des Tasks.' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Task nicht gefunden.' });
    }

    await task.destroy();
    return res.status(200).json({ message: 'Task erfolgreich gelöscht.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fehler beim Löschen des Tasks.' });
  }
};
