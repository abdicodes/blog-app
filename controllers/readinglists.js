const router = require('express').Router();
const middleware = require('../utils/middleware');
const { ReadingList, User, Blog } = require('../models');
const { userExtractor } = require('../utils/middleware');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

router.post('/', async (req, res) => {
  const readingList = await ReadingList.create(req.body);
  res.json(readingList);
});

router.put('/:id', userExtractor, async (req, res) => {
  const reading = await ReadingList.findByPk(req.params.id);
  if (!reading) {
    res.status(404).end();
  } else if (!(reading.userId === req.user.id)) {
    res.status(400).end();
  } else {
    console.log(reading.userId, req.user.id);
    reading.read = req.body.read;
    await reading.save();
    res.json(reading);
  }
});
module.exports = router;
