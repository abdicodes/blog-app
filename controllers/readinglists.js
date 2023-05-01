const router = require('express').Router();
const middleware = require('../utils/middleware');
const { ReadingList } = require('../models');
const { userExtractor } = require('../utils/middleware');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

router.post('/', async (req, res) => {
  const readingList = await ReadingList.create(req.body);
  res.json(readingList);
});

module.exports = router;
