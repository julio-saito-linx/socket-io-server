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
                html += '<p>' + client.userName + '</p>';
                html += '<p>' + client.sid + '</p>';
                html += '</div>';
                jClients.append(html);
            }
        };

    };

    var initializeSocketIO = function() {
    
        // TODO: 192.168... must be dynamic
        var socket = io.connect('http://192.168.15.103');

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

        socket.on('server:userName', function (userName){
            $('#socketInfo').html('connected as ' + userName);
        });

        // socket.on('toAll:playlist:add', function (songJson) {
        //     log('toAll:playlist:add', '[' + songJson.id + '] ' + songJson.artist + ' - ' + songJson.title);
        // });

    };

    initializeSocketIO();

});