const bodyParser = require('body-parser');
const express = require('express');
const { sequelize } = require('./models');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/task', require('./routes/tasks'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Synchronize the database
sequelize.sync().then(() => {
  console.log('Database synchronized');
});
