const router = require('express').Router();
const middleware = require('../utils/middleware');
const { Blog, User } = require('../models');
const { userExtractor } = require('../utils/middleware');
const { Op } = require('sequelize');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  let where = {};

  if (req.query.search) {
    where = {
      ...where,
      [Op.or]: [
        {
          title: {
            [Op.substring]: req.query.search,
          },
        },
        {
          author: {
            [Op.substring]: req.query.search,
          },
        },
      ],
    };
  }

  const notes = await Blog.findAll({
    attributes: { exclude: ['id', 'userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
  });
  res.json(notes);
});

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.post('/', middleware.userExtractor, async (req, res) => {
  if (!req.body.url || !req.body.title) res.status(400);
  const blog = await Blog.create({ ...req.body, userId: req.user.id });
  return res.json(blog);
});

router.put('/:id', blogFinder, async (req, res) => {
  if (!req.body.likes) res.status(400).end();
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', blogFinder, userExtractor, async (req, res) => {
  const user = req.user;
  const blog = await Blog.findByPk(req.params.id);
  if (blog && user) {
    if (blog.userId == user.id) {
      blog.destroy();
      res.status(204).end();
    }
    res.status(401).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
