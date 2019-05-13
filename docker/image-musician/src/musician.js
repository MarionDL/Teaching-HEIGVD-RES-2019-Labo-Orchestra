/**
 * Musician app
 * Author : Marion Dutu Launay
 */

// We specify the protocol used
var protocol = require('../../image-auditor/src/orchestra-protocol');

// We use a standard Node.js module to work with UDP
var dgram = require('dgram');

// We create a datagram socket to send our UDP datagrams
var s = dgram.createSocket('udp4');

var uuid = require('uuid');
var moment = require('moment');

// Get the musician instrument from the command line attribute
var instrument = process.argv[2];

var sound;

// Get the sound produced by the instrument
switch(instrument) {
    case "piano":
        sound = "ti-ta-ti";
        break;
    case "trumpet":
        sound = "pouet";
        break;
    case "flute" :
        sound = "trulu";
        break;
    case "violin" :
        sound = "gzi-gzi";
        break;
    case "drum" :
        sound = "boum-boum";
        break;
}


// Send sound every second
setInterval(this.update.bind(this), 1000);

sendMessage = function() {

    // We create the payload with the uuid and the sound
    var json = {
        uuid: uuid(),
        instrument: sound
    };

    // We capture the moment when the message will be sent
    json.activeSince = moment();

    // Encapsulate the payload in a UDP datagram
    message = new Buffer(json);
    s.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS, function(err, bytes) {
        console.log("Sending payload: " + json + " via port " + s.address().port);
    });
}