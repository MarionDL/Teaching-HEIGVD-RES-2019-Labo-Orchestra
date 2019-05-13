/**
 * Auditor app
 * Author : Marion Dutu Launay
 */

// We specify the protocol used
const protocol = require('./orchestra-protocol');

// We use a standard Node.js module to work with UDP
var dgram = require('dgram');
var moment = require('moment');
var net = require('net');

// The array that will contain musicians
var musicians = [];

/*
 * We create a datagram socket. We will use it to listen for datagrams published in the
 * multicast group by musicians and containing the sound made by the instrument
 */
const socket = dgram.createSocket('udp4');

socket.bind(protocol.PROTOCOL_PORT, function() {
    console.log("Joining multicast group");
    socket.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});

socket.on('message', function(msg, source) {

    // We print the info we just received
    console.log("Data has arrived: " + msg + ". Source port: " + source.port);

    // We parse the message we received
    var json = JSON.parse(msg);

    // We keep updated the musicians array
    for (var i = 0; i < musicians.length; ++i) {
        if (json.uuid == musicians[i].uuid) {
            musicians[i].activeSince = json.activeSince;
            return;
        }
    }
    musicians.push(json);
});

// We create a TCP server
var server = net.createServer();
server.listen(protocol.PROTOCOL_PORT);
console.log("TCP server is running on port : " + protocol.PROTOCOL_PORT);

server.on('connection', function(socket) {
    for (var i = 0; i < musicians.length; ++i) {
        // If the musician is not active anymore (less than 5 sec), we remote it
        if (moment().diff(musicians[i].activeSince) > 5000) {
            console.log("Musician removed : " + JSON.stringify(musicians[i]));
            musicians.splice(i, 1);
        }
    }
    // We print the active musicians
    socket.write(JSON.stringify(musicians));
    socket.destroy();
});