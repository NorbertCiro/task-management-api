const Sequilize = require('sequelize');

const sequelize = new Sequilize('api_tasks', 'root', 'my-secret-pw', {
  host: 'localhost',
  dialect: 'mysql'
});

const Task = sequelize.define('task', {
  title: {
    type: Sequilize.STRING,
    AllowNull: false
  },
  completed: {
    type: Sequilize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = { sequelize, Task };

