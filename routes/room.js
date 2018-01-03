var express = require('express');
var path = require('path');
var Redis = require('ioredis');
var router = express.Router();

router.get('/:roomName', function(req, res, next) {
  var roomName = req.params.roomName;
  var redis = new Redis(6379, 'wecode.datinker.com');
  redis.exists('rooms:'+roomName, function(err, result) {
    if(err) {
      var err = new Error('Internal Server Error');
      err.status = 500;
      res.status(500);
      res.render('error', {err});
    } else if(result) {
      res.status(200);
      res.render('room');
    } else {
      var err = new Error('Chat Room Not Found');
      err.status = 666;
      res.render('error', {err});
    }
  });
});

module.exports = router;
