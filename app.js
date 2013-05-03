/*
| -------------------------------------------------------------------
|  MTGNode App
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/


// Loading dependencies
var express = require('express')
  , http = require('http')
  , path = require('path')
  , hub = require('./realtime/hub.js');

// Initializing the application
var app = express();

// Forcing Development mode
app.set('env', 'development');

// Instructions for all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('tezcatlipoca'));
app.use(express.session({secret : 'coatlicue'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Dev only instructions
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  console.log('WARNING :: Development Mode');
}


// Routing
//--------

// Calling Controllers
var home = require('./controllers')
  , game = require('./controllers/game')
  , ajax = require('./controllers/ajax');


// Main routes
app.get('/', home.login);
app.get('/lobby', home.lobby)

// Game routes
app.get('/game', game.index);

// Ajax
app.post('/ajax/login_attempt', ajax.login_attempt);


// Server
var server = http.createServer(app);
var io = new hub(server);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var sl = require('sqlite3');








