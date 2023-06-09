const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./readinglist');
const ActiveSession = require('./activeSession');
User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: 'marked_blogs' });
Blog.belongsToMany(User, { through: ReadingList, as: 'users_list' });

module.exports = {
  Blog,
  User,
  ReadingList,
  ActiveSession,
};
