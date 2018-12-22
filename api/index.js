const express = require('express');
const app = express();
const nconf = require('nconf');

let CONFIG_SCHEME = process.env.CONFIG_SCHEME || 'local';
nconf.argv()
  .env({ separator: '_', lowerCase: true })
  .file({ file: `config/env/.${CONFIG_SCHEME}.json` });

nconf.defaults({
  PORT: 3000,
  NODE_ENV: 'development'
});

global._ = require('lodash');
global.logger = require('./config/logger');

// ORM config and sync
let { db } = require('./models');
db.sync({}).then(() => {
  logger.info('DB Initialized');

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next();
  });

  app.get('/', (req, res) => {
    res.send('Welcome MyApp API!');
  });

  // Configure routing
  app.use(require('./config/routes'));

  app.all('*', (req, res, next) => {
    // Response 404
    logger.warn(`Route not found '${req.originalUrl}'`);
    res.status(404).send({ messate: '404 Not Found' });
  });

  // Error handler
  app.use((err, req, res, next) => {
    if (err) {
      logger.error(`Error processing route '${req.originalUrl}'`, err);
      return res.status(err.status || 500).send(err);
    }
    next();
  });

  const PORT = nconf.get('PORT') || 3000;
  app.listen(PORT, () => logger.info(`MyApp API is listening on port ${PORT}`));
}).catch(err => {
  logger.error('Error initialize db', err);
  process.exit(1);
});
