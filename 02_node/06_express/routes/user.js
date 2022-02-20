const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('user');
});

router.route('/get_post')
  .get((req, res) => {
    res.send('get');
  })
  .post((req, res) => {
    res.send('post');
  });

router.get('/:id', (req, res) => {
  console.log(req.params, req.query);
  res.send([req.params, req.query]);
});

router.get('/now', (req, res) => {
  res.send('now');
});
module.exports = router;
