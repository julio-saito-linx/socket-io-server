/*
++++++++++++++
    SERVER
++++++++++++++
 */

'use strict';

exports.startSockets = function(io, session, sessionsList){
  io.sockets.on('connection', function (socket) {

    // connection
    io.sockets.emit(
      'clientsChanged',
      {
        usersCount: io.sockets.clients().length
      }
    );


    socket.on('client:connection', function (clientInfo) {
        console.log('\n\nclient:connection:', clientInfo,  '\n\n');
        var clientSID = clientInfo.sid;
        var userName = sessionsList.getValue(clientSID);
        
        //send info from server
        socket.emit('server:userName', userName);
    });

    socket.on('client:request:players', function (clientInfo) {
        console.log('\n\nclient:request:players:', clientInfo,  '\n\n');
        socket.emit('server:playersList', []);
    });
   
    // on disconnection
    socket.on('disconnect', function () {
        socket.broadcast.emit('clientsChanged', 
          {
            clientData: {
              usersCount: io.sockets.clients().length - 1
            }
          }
        );
    });
   
    socket.on('toSocket:playlist:add', function (data) {
      console.log('\n: toSocket:playlist:add -> ', data, '\n');
      socket.broadcast.emit('toAll:playlist:add', data);
    });

  });
  
};

