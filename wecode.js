var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var https = require('https');
var nunjucks = require('nunjucks');

var index = require('./routes/index');
var users = require('./routes/users');
var compileAndRun = require('./routes/compileAndRun');
var codepad = require('./routes/codepad');
var createRoom = require('./routes/createRoom');
var room = require('./routes/room');

var app = express();
var port = 443;

//SSL certificate
var credentials = {
    ca: fs.readFileSync('./ssl/wecode_datinker_com.ca-bundle'),
    key: fs.readFileSync('./ssl/webster.key'),
    cert: fs.readFileSync('./ssl/wecode_datinker_com.crt')
};

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/codepad', codepad);
app.use('/users', users);
app.use('/compileAndRun', compileAndRun);
app.use('/createRoom', createRoom);
app.use('/room', room);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {err});
});

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, function() {
  console.log("Express server listening on port " + port);
});;

module.exports = app;
