/**
 * Sequelize
 */
const nconf = require('nconf');
const Sequelize = require('sequelize');

const dbConfig = nconf.get('datastore') || {};
const operatorsAliases = {};

let opts = {
  host: dbConfig.host || 'localhost',
  port: dbConfig.port || 3306,
  dialect: 'mysql',
  dialectOptions: {
    insecureAuth: true,
    multipleStatements: true,
  },
  operatorsAliases,

  pool: {
    max: 5,
    min: 0,
    idle: 100
  },

  logging: false,
  // logging: (msg) => logger.debug(msg),
};

let dbName = dbConfig.database || 'mydatabase';
let dbUserName = dbConfig.username || 'root';
let dbPassword = dbConfig.password || '';

module.exports = new Sequelize(dbName, dbUserName, dbPassword, opts);
