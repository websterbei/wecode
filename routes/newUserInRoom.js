var express = require('express');
var path = require('path');
var Redis = require('ioredis');
var router = express.Router();

router.post('/', function(req, res, next) {
  var roomName = req.body.roomName;
  var peerId = req.body.peerId;
  console.log(roomName);
  console.log(peerId);
  var redis = new Redis(6379, 'wecode.datinker.com');
  redis.sadd('room:'+roomName+':peers', peerId, function(err, result) {
    if(err) {
      res.status(500);
      res.send({status: false, reason: 'failed to register peer'});
    } else {
      redis.smembers('room:'+roomName+':peers', function(err, result) {
        if(err) {
          res.status(500);
          res.send({status: false, reason: 'failed to query peer list in the room'});
        } else {
          res.status(200);
          res.send({status: true, result: result});
        }
      });
    }
  });
});

module.exports = router;
