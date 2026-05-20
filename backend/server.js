const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { sequelize } = require('./models');

dotenv.config();
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Serve Frontend Static Build Assets in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Team Task Manager SQL API Running Dev Engine.');
  });
}

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('MySQL Schema Synced Successfully.');
    app.listen(PORT, () => console.log(`Server executing live on port ${PORT}`));
  })
  .catch(err => console.error('Database connection sync failed:', err));