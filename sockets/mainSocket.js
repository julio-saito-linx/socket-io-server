/*
++++++++++++++
    SERVER
++++++++++++++
 */

'use strict';

exports.startSockets = function(io, sessionsList, clientList){
  io.sockets.on('connection', function (socket) {
    /*
      get clientInfo direct from the client
    */
    socket.on('client:connection', function (clientInfo) {
      var clientSID = clientInfo.sid;
      var userName = sessionsList.getValue(clientSID);
      clientInfo.userName = userName;

      socket.set('clientInfo', clientInfo);
      
      //send info from server
      socket.emit('server:userName', userName);
      socket.broadcast.emit('clientConnected');
    });

    var registerClient = function(socketID, clientInfo){
      clientList.register(socketID, clientInfo);
    };

    /*
      whoIsConnected
    */
    socket.on('whoIsConnected', function (clientInfo) {
        //clear all players info list
        clientList.unregisterAll();

        console.log('\n\nwhoIsConnected:', socket.id, clientInfo,  '\n\n');
        
        var allClients = io.sockets.clients();
        
        for (var i = 0; i < allClients.length; i++) {
          var client = allClients[i];
          clientList.register(client.id, {});

          /* jshint -W083 */
          client.get('clientInfo', function(err, clientInfo) {
            registerClient(client.id, clientInfo);
          });

          // if is the lastone
          if(i === allClients.length-1){
            // send all clients connected to user
            socket.emit('server:clientList', clientList.getAllValues());
          }
        }
        
    });
   
    // on disconnection
    socket.on('disconnect', function () {
      socket.broadcast.emit('clientDisconnected');
    });
   
    socket.on('toSocket:playlist:add', function (data) {
      console.log('\n: toSocket:playlist:add -> ', data, '\n');
      socket.broadcast.emit('toAll:playlist:add', data);
    });

  });
  
};

