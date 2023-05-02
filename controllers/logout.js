const router = require('express').Router();
const middleware = require('../utils/middleware');
const { ActiveSession, User } = require('../models');
const { userExtractor } = require('../utils/middleware');
const { Op } = require('sequelize');

router.delete('/', userExtractor, async (req, res) => {
  const user = req.user;
  const session = await ActiveSession.findOne({
    where: {
      userId: user.id,
    },
  });

  if (session) {
    session.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
