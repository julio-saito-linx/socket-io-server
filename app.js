var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(9003);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

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
