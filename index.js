const express = require('express');
require('express-async-errors');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');
const app = express();

const blogsRouter = require('./controllers/blogs');
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

start();
