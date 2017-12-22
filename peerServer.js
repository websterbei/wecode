var express = require('express');
var app = express();
var PORT = 8081
var ExpressPeerServer = require('peer').ExpressPeerServer;
var path = require('path')
var http = require('http');
var https = require('https');
var fs = require('fs');

var sslOptions = {
  ca: fs.readFileSync('./ssl/wecode_datinker_com.ca-bundle'),
  key: fs.readFileSync('./ssl/webster.key'),
  cert: fs.readFileSync('./ssl/wecode_datinker_com.crt')
};

var server = https.createServer(sslOptions, app).listen(PORT);

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/peerjs', ExpressPeerServer(server, {debug:true}));
app.use('/', express.static(path.join(__dirname, '/client')))
