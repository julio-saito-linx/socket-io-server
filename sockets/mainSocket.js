/*
++++++++++++++
    SERVER
++++++++++++++
 */

'use strict';

exports.startSockets = function(io, sessionsList, clientList){
  var RSVP = require('rsvp');
  var _ = require('underscore');

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

    var getAllClients = function(clientInfo) {
      var promise = new RSVP.Promise(function(resolve, reject) {
        //clear all players info list
        clientList.unregisterAll();

        console.log('\n\nclient:request:clients:connected:', socket.id, clientInfo,  '\n\n');
        
        var allClients = io.sockets.clients();
        
        for (var i = 0; i < allClients.length; i++) {
          var client = allClients[i];
          clientList.register(client.id, {});

          /* jshint -W083 */
          client.get('clientInfo', function(err, clientInfo) {
            if(err){
              return reject(err);
            }
            registerClient(client.id, clientInfo);
          });

          // if is the lastone
          if(i === allClients.length-1){
            resolve(clientList.getAllValues());
          }
        }
      });
      return promise;
    };

    var registerClient = function(socketID, clientInfo){
      clientList.register(socketID, clientInfo);
    };

    /*
      client:request:clients:connected
    */
    socket.on('client:request:clients:connected', function (clientInfo) {
        getAllClients(clientInfo).then(function(allClients) {
          // send all clients connected to user
          socket.emit('server:response:clients:connected', allClients);
        });
    });

    socket.on('client:request:players:connected', function (clientInfo) {
        getAllClients(clientInfo).then(function(allClients) {
          
          var onlyPlayers = _.filter(allClients, function(client){ 
            return  client.appName === '1-player';
          });

          socket.emit('server:response:players:connected', onlyPlayers);
        });
    });
   
    /*
      client:request:playerName
    */
    socket.on('client:request:playerName', function (clientInfo) {
        getAllClients(clientInfo).then(function(allClients) {
          //filter only players of the user
          
          var filtered = _.filter(allClients, function(client){ 
            return  client.appName === '1-player'
                &&  client.userName === clientInfo.userName;
          });

          var playerName = clientInfo.userName + '\'s player ' + (filtered.length);

          socket.emit('server:response:playerName', playerName);
        });
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

