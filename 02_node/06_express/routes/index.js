const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  req.index = { text: '1' };
  console.log('다음으로 넘김');
  next('route');
}, (req, res, next) => {
  req.index.text += '2';
  console.log('실행 불가');
  next();
}, (req, res, next) => {
  req.index.text += '3';
  console.log('실행 불가');
  next();
});
router.get('/', (req, res) => {
  res.send(req.index.text);
});

module.exports = router;
