const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProjectById } = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, authorize('Admin'), createProject)
  .get(protect, getProjects);

router.route('/:id').get(protect, getProjectById);

module.exports = router;