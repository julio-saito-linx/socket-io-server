$(function() {
    var jPre = $('pre');

    var log = function(eventName, data) {
        console.log(eventName, data);
        jPre.append('<span class="eventName">' + eventName + ":</span>");
        jPre.append('<span class="data">' + JSON.stringify(data, ' ', 2) + "</span>");
        jPre.append('<br />');
    };

    // TODO: 192.168... must be dynamic
    var socket = io.connect('http://192.168.15.103');
    socket.on('yourAreConnected', function (date) {
        log('yourAreConnected', date);
    });

    socket.on('toAll:playlist:add', function (songJson) {
        log('toAll:playlist:add', songJson.artist + ' - ' + songJson.title);
    });

});