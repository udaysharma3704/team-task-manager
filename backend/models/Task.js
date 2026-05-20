const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
    defaultValue: 'To Do',
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Task;