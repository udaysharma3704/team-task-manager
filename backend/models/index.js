const sequelize = require('../config/db');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');

// Project - Creator (One-to-Many)
User.hasMany(Project, { foreignKey: 'createdById', as: 'createdProjects' });
Project.belongsTo(User, { foreignKey: 'createdById', as: 'creator' });

// Project - Members (Many-to-Many Join via ProjectMembers)
Project.belongsToMany(User, { through: 'ProjectMembers', as: 'members', foreignKey: 'projectId' });
User.belongsToMany(Project, { through: 'ProjectMembers', as: 'projects', foreignKey: 'userId' });

// Task - Project (One-to-Many)
Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

// Task - User Assignment (One-to-Many)
User.hasMany(Task, { foreignKey: 'assignedToId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'assignedToId', as: 'assignedTo' });

module.exports = {
  sequelize,
  User,
  Project,
  Task
};