/**
 * Auditor app
 * Author : Marion Dutu Launay
 */

// We specify the protocol used
const protocol = require('./orchestra-protocol');

// We use a standard Node.js module to work with UDP
var dgram = require('dgram');

/*
 * We create a datagram socket. We will use it to listen for datagrams published in the
 * multicast group by musicians and containing the sound made by the instrument
 */
const s = dgram.createSocket('udp4');
s.bind(protocol.PROTOCOL_PORT, function() {
    console.log("Joining multicast group");
    s.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});

// We print the info we just received
s.on('message', function(msg, source) {
    console.log("Data has arrived: " + msg + ". Source port: " + source.port);
});