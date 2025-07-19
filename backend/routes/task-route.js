const express = require('express');
const { getAllTasks, createTask, deleteTask, getAllAssignTasks, updateTask } = require('../controlers/task-controler');
const isAllow = require('../middlewares/is-allow');

const taskRoute = express.Router();
module.exports = taskRoute;


taskRoute.get('/', getAllTasks);

taskRoute.get('/assign', isAllow('admin', 'manager'), getAllAssignTasks);

taskRoute.post('/', isAllow('admin', 'manager'), createTask);

taskRoute.delete('/:id', isAllow('admin', 'manager'), deleteTask)

taskRoute.put('/:id', isAllow('admin', 'manager'), updateTask)