var express = require('express')
  , bodyParser = require('body-parser') // for reading POSTed form data into `req.body`
  , expressSession = require('express-session')
  , cookieParser = require('cookie-parser') // the session is stored in a cookie, so we use this to parse it
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , path = require('path')
  , routes = require('./routes')
  , user = require('./routes/user')
  , mainSocket = require('./sockets/mainSocket');
;

// static
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// all environments
app.set('port', process.env.PORT || 9004);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({secret:'some-secret_token=here'}));


app.get('/', routes.index);

app.get('/logon', function(req, res){
  if (req.session.userName) {
    res.redirect('/');
  } else {
    res.render('logon');
  }
});


// Sessions list
var Registry = require('./lib/registry').Registry;
var sessionsList = new Registry();

app.post('/logon', function(req, res){
  
  // set new session
  req.session.userName = req.body.userName;

  sessionsList.register(req.session.id, req.session.userName);

  // start socket
  mainSocket.startSockets(io, req.session, sessionsList);

  // go to index
  res.redirect('/');
});




server.listen(9003);
