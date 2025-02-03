const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const {
  getTasks,
  getTaskDetails,
  createTask,
  updateTask,
  updateSubTask
} = require('../controllers/taskController');

router.use(authMiddleware);
router.get('/', getTasks);
router.get('/:id', getTaskDetails);
router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id/subtasks/:subTaskId', updateSubTask);

module.exports = router;