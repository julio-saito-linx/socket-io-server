'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    path = require('path'),
    routes = require('./routes'),
    mainSocket = require('./sockets/mainSocket');


var Registry = require('./lib/registry').Registry;
var sessionsList = new Registry();
var playersList = new Registry();


// static
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// all environments
app.set('port', process.env.HTTP_PORT || 9003);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({secret:'some-secret_token=here'}));


app.get('/', routes.index);

app.get('/logon', function(req, res){
  if (req.session.roomName) {
    res.redirect('/');
  } else {
    res.render('logon');
  }
});

app.post('/logon', function(req, res){

  // set new session
  req.session.roomName = req.body.roomName;

  sessionsList.register(req.session.id, req.session.roomName);

  // go to index
  res.redirect('/');
});

// start socket
mainSocket.startSockets(io, sessionsList, playersList);


server.listen(process.env.HTTP_PORT);
