const express = require('express');
const router = express.Router();
const { Task } = require('../models');

router.get('/', async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

router.put('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) {
      task.update(req.body);
      res.json(task);
  } else {
      res.status(404).send('Task not found');
  }
});

router.delete('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) {
      task.destroy();
      res.send('Task deleted');
  } else {
      res.status(404).send('Task not found');
  }
});

module.exports = router;