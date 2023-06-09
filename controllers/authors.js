const router = require('express').Router();
const middleware = require('../utils/middleware');
const { Blog, User } = require('../models');
const { userExtractor } = require('../utils/middleware');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],

    //   where,
    group: 'author',
    order: [['likes', 'DESC']],
  });
  res.json(blogs);
});

module.exports = router;
