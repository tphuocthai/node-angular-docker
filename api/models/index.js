const sequelize = require('../config/sequelize');
const User = require('./User');

// Model relations here

module.exports = {
  User,
  db: sequelize,
};