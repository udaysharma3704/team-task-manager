const { Task, Project, User } = require('../models');

exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedToId, dueDate } = req.body;
    const targetProject = await Project.findByPk(projectId);
    if (!targetProject) return res.status(404).json({ message: 'Target project missing.' });

    const task = await Task.create({ title, description, projectId, assignedToId, dueDate });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    let whereClause = {};
    if (req.user.role !== 'Admin') {
      whereClause.assignedToId = req.user.id;
    }
    if (req.query.projectId) {
      whereClause.projectId = req.query.projectId;
    }

    const tasks = await Task.findAll({
      where: whereClause,
      include: [
        { model: Project, as: 'project', attributes: ['id', 'name'] },
        { model: User, as: 'assignedTo', attributes: ['id', 'name', 'email'] }
      ]
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    if (req.user.role !== 'Admin' && task.assignedToId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized status change action.' });
    }

    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDashboardAnalytics = async (req, res) => {
  try {
    let whereClause = {};
    if (req.user.role !== 'Admin') {
      whereClause.assignedToId = req.user.id;
    }

    const tasks = await Task.findAll({ where: whereClause });
    const now = new Date();

    const analytics = {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'To Do').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      done: tasks.filter(t => t.status === 'Done').length,
      overdue: tasks.filter(t => t.status !== 'Done' && new Date(t.dueDate) < now).length,
    };
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};