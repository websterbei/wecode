var express = require('express');
var path = require('path');
var router = express.Router();
var execution = require('./compile/compileAndRunJava')

/* GET home page. */
router.post('/', function(req, res, next) {
  var language = req.body.language;
  var code = req.body.code;
  var stdin = req.body.stdin;
  var result = execution(code, stdin);
  res.send(result);
});

module.exports = router;
