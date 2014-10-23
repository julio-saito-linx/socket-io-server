/*
++++++++++++++
    client
++++++++++++++
 */

/*global io*/
'use strict';

$(function() {
    var renderClients = function(clientList) {
        console.log(clientList);

        var jClients = $('.clients');
        jClients.html('');

        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if(client !== null){
                var html = '<div class="btn btn-default navbar-btn">';
                html += '<p>' + client.appName + '</p>';
                html += '<p>' + client.roomName + '</p>';
                html += '<p>' + client.sid + '</p>';
                html += '</div>';
                jClients.append(html);
            }
        }
    };

    var initializeSocketIO = function() {

        // TODO: 192.168... must be dynamic
        var socket = io.connect('http://socketserver.azk.dev');

        var clientInfo = {
            appName: '3-socketServer',
            sid: $('#sidSpan').text()
        };
        console.info('me:', clientInfo);

        // first connection -> send SID to server
        // server -> client
        socket.on('connect', function (){
            socket.emit('client:connection', clientInfo);
            socket.emit('client:request:clients:connected', clientInfo);
        });

        socket.on('clientConnected', function (){
            socket.emit('client:request:clients:connected', clientInfo);
        });
        socket.on('clientDisconnected', function (){
            socket.emit('client:request:clients:connected', clientInfo);
        });

        socket.on('server:response:clients:connected', renderClients);

        socket.on('server:roomName', function (roomName){
            $('#socketInfo').html(roomName);
        });

    };

    initializeSocketIO();

});