$(function() {
    var jPreLog = $('.log');
    var jUlUsers = $('.users');

    var log = function(eventName, data) {
        console.log(eventName, data);
        jPreLog.append('<span class="eventName">' + eventName + ":</span>");
        jPreLog.append('<span class="data">' + JSON.stringify(data, ' ', 2) + "</span>");
        jPreLog.append('<br />');
    };

    var renderSocketClients = function(io_sockets_clients_count) {
        jUlUsers.html('Total users connected: ' + io_sockets_clients_count);
    };

    // TODO: 192.168... must be dynamic
    var socket = io.connect('http://192.168.15.103');
    
    // connect or disconnect, always update
    socket.on('clientsChanged', function (io_sockets_clients_count) {
        renderSocketClients(io_sockets_clients_count);
    });
    socket.on('userDisconnected', function (io_sockets_clients_count) {
        renderSocketClients(io_sockets_clients_count);
    });

    socket.on('toAll:playlist:add', function (songJson) {
        log('toAll:playlist:add', '[' + songJson.id + '] ' + songJson.artist + ' - ' + songJson.title);
    });

});