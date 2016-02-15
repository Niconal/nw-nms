'use strict';
const dgram = require('dgram');
const snmptrap = require('../config/snmptrap');

let instance;
const internals = {};

exports = module.exports = internals;

/*API private*/
const factory = function() {

    const udp = dgram.createSocket('udp4');

    udp.on('listening', () => {

        var address = udp.address();
        console.log('UDP Server listening on ' + address.address + ":" + address.port);
    });

    udp.bind(snmptrap.port, snmptrap.host);

    return udp;
};

/*API public*/
internals.getInstance = function(next) {

    if (instance === undefined) {

        instance = factory();
    } else {
        console.log('esperando respuesta...')
        instance.on('message', (message, remote) => {
            console.log(remote.address + ':' + remote.port);
            console.log(message);
            next(message, remote)
        });
    }
};
