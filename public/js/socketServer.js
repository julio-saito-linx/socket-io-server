/*
++++++++++++++
    client
++++++++++++++
 */

/*global io*/
'use strict';

$(function() {
    var jPreLog = $('.log');
    var jUlUsers = $('.users');

    var log = function(eventName, data) {
        console.log(eventName, data);
        // jPreLog.append('<span class="eventName">' + eventName + ':</span>');
        // jPreLog.append('<span class="data">' + JSON.stringify(data, ' ', 2) + '</span>');
        // jPreLog.append('<br />');
    };

    var renderTotalConnections = function(data) {
        jUlUsers.html('Connections to socket.io: ' + data.usersCount);
    };

    // TODO: 192.168... must be dynamic
    var socket = io.connect('http://192.168.15.103');
    
    // connect or disconnect, always update
    socket.on('clientsChanged', function (data) {
        renderTotalConnections(data);
        log('clientsChanged', data);
    });
    socket.on('userDisconnected', function (data) {
        renderTotalConnections(data);
        log('userDisconnected',{});
    });

    socket.on('client:connection', function (data) {
        log('client:connection', data);
    });

    socket.on('toAll:playlist:add', function (songJson) {
        log('toAll:playlist:add', '[' + songJson.id + '] ' + songJson.artist + ' - ' + songJson.title);
    });


});