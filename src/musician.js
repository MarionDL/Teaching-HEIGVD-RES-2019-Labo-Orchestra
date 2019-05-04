/**
 * Musician app
 * Author : Marion Dutu Launay
 */

// We specify the protocol used
var protocol = require('./orchestra-protocol');

// We use a standard Node.js module to work with UDP
var dgram = require('dgram');

// We create a datagram socket to send our UDP datagrams
var s = dgram.createSocket('udp4');

/* We define a javascript class for our musician. The constructor accepts
* a instrument */
function Musician(instrument) {

    this.instrument = instrument;

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

    Musician.prototype.update = function() {

        // Put the sound into payload
        var payload = JSON.stringify(sound);

        // Encapsulate the payload in a UDP datagram
        message = new Buffer(payload);
        s.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS, function(err, bytes) {
            console.log("Sending payload: " + payload + " via port " + s.address().port);
        });
    }

    // Send sound every second
    setInterval(this.update.bind(this), 1000);
}

// Get the musician instrument from the command line attribute
var instrument = process.argv[2];

// Create a new musician
var m1 = new Musician(instrument);