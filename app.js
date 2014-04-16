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
;

// static
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// all environments
app.set('port', process.env.PORT || 9004);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(expressSession({secret:'some-secret_token=here'}));


app.get('/', routes.index);

// app.get('/', function (req, res) {
//     console.log('req.session.userName=', req.session.userName);
//     res.sendfile(__dirname + '/index.html');
// });

io.sockets.on('connection', function (socket) {
  socket.emit('yourAreConnected', new Date());
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('toSocket:playlist:add', function (data) {
    console.log("\n toSocket:playlist:add \n", data);
    socket.broadcast.emit('toAll:playlist:add', data);
  });
});

server.listen(9003);
