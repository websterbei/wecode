var express = require('express');
var path = require('path');
var Redis = require('ioredis');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log(req.body.data);
  res.status(200);
  res.send('ok');
});

module.exports = router;
