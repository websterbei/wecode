var express = require('express');
var path = require('path');
var Redis = require('ioredis');
var router = express.Router();

router.post('/', function(req, res, next) {
  var roomName = req.body.roomName;
  var peerId = req.body.peerId;
  var redis = new Redis(6379, 'wecode.datinker.com');
  redis.set('rooms:'+roomName+':peers:' + peerId, true, function(err) {
    if(err) {
      res.status(500);
      res.send({status: false, reason: 'failed to register peer'});
    } else {
      redis.expire('rooms:'+roomName+':peers:' + peerId, 10);//Add a expiration of 10 secs
      redis.keys('rooms:'+roomName+':peers:*', function(err, result) {
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
