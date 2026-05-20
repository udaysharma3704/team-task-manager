const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTaskStatus, getDashboardAnalytics } = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/dashboard-analytics', protect, getDashboardAnalytics);
router.route('/')
  .post(protect, authorize('Admin'), createTask)
  .get(protect, getTasks);
router.patch('/:id/status', protect, updateTaskStatus);

module.exports = router;