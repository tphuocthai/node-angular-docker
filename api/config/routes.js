const { Router } = require('express');

const wrap = fn => (req, res, next) => {
  fn(req, res, next).catch(next);
};

const router = Router();

router.get('/test', wrap(async (req, res) => {
  res.json({ hello: 'World' });
}));

module.exports = router;
