const express = require('express');
const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');
const app = express();

const blogsRouter = require('./controllers/blogs');
app.use(express.json());
app.use('/api/blogs', blogsRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();