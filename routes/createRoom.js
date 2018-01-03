var express = require('express');
var path = require('path');
var Redis = require('ioredis');
var router = express.Router();

function roomInitialize(redis, roomName) {
  var key = 'rooms:'+roomName;
  redis.set(key, true);
  redis.expire(key, 604800); //The code room will exist for seven days without logging in
}

router.post('/', function(req, res, next) {
  var roomName = req.body.roomName;
  var redis = new Redis(6379, 'wecode.datinker.com');
  redis.exists('rooms:'+roomName, function(err, result) {
    if(err) res.send({status: false, reason: 'Internal Error'});
    else if(result) res.send({status: false, reason: 'Room Already Exists'});
    else {
      try {
        roomInitialize(redis, roomName);
        res.send({status: true, reason: null});
      } catch(e) {
        res.send({status: false, reason: e});
      }
    }
  });
});

module.exports = router;
