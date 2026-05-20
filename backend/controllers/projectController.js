const { Project, User } = require('../models');

exports.createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const project = await Project.create({ name, description, createdById: req.user.id });

    let memberIds = [req.user.id];
    if (members && Array.isArray(members)) {
      memberIds = [...new Set([...members.map(Number), req.user.id])];
    }
    await project.setMembers(memberIds);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    let includeOptions = [
      { model: User, as: 'creator', attributes: ['id', 'name', 'email'] },
      { model: User, as: 'members', attributes: ['id', 'name', 'email', 'role'], through: { attributes: [] } }
    ];

    let projects;
    if (req.user.role === 'Admin') {
      projects = await Project.findAll({ include: includeOptions });
    } else {
      const userWithProjects = await User.findByPk(req.user.id, {
        include: [{ model: Project, as: 'projects', include: includeOptions }]
      });
      projects = userWithProjects ? userWithProjects.projects : [];
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        { model: User, as: 'creator', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'members', attributes: ['id', 'name', 'email', 'role'] }
      ]
    });
    if (!project) return res.status(404).json({ message: 'Project not found.' });

    if (req.user.role !== 'Admin') {
      const isMember = await project.hasMember(req.user.id);
      if (!isMember) return res.status(403).json({ message: 'Access denied.' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};