exports.startSockets = function(io, userName){
  'use strict';
  io.sockets.on('connection', function (socket) {

    // connection
    io.sockets.emit('clientsChanged', io.sockets.clients().length);
    
    // on disconnection
    socket.on('disconnect', function () {
        socket.broadcast.emit('clientsChanged', io.sockets.clients().length - 1);
    });
   
    socket.on('toSocket:playlist:add', function (data) {
      console.log('\n' + userName + ': toSocket:playlist:add \n', data);
      socket.broadcast.emit('toAll:playlist:add', data);
    });

  });
  
};

