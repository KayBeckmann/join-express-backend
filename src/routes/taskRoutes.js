const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// Alle Tasks abrufen (nur für authentifizierte Benutzer)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Neuen Task erstellen
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    const task = await Task.create({ title, description, dueDate, priority, status });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
