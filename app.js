var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(9003);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


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
