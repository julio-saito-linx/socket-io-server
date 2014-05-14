/*
++++++++++++++
    SERVER
++++++++++++++
 */

'use strict';

exports.startSockets = function(io, session){
  
  // serverData
  var serverData = {};
  serverData.sid = session.sid;
  serverData.userName = session.userName;

  io.sockets.on('connection', function (socket) {

    // connection
    io.sockets.emit(
      'clientsChanged',
      {
        serverData: serverData,
        usersCount: io.sockets.clients().length
      }
    );
    
    socket.on('client:connection', function (data) {
        console.log('client:connection received');
        socket.broadcast.emit(
          'client:connection', 
          {
            serverData: serverData,
            clientData: data
          }
        );
        
        //send info from server
        socket.emit('server:status',
        {
          serverData: serverData
        });
    });
   
    // on disconnection
    socket.on('disconnect', function () {
        socket.broadcast.emit('clientsChanged', 
          {
            serverData: serverData,
            clientData: {
              usersCount: io.sockets.clients().length - 1
            }
          }
        );
    });
   
    socket.on('toSocket:playlist:add', function (data) {
      console.log('\n' + session + ': toSocket:playlist:add \n', data);
      socket.broadcast.emit('toAll:playlist:add', 
        {
          serverData: serverData,
          data: data
        }
      );
    });

  });
  
};

