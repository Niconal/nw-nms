'use strict';

const ChildProcess = require('./ChildProcess');
//const UDPSocket = require('./UDPSocket');
const fs = require('fs');
const cp = new ChildProcess();

exports.register = function(server, commands, next) {

    const io = require('socket.io')(server.listener);

    io.on('connection', (conn) => {

        conn.on('snmpCommand', (data) => {

            const commandAll = data.command.split(" ");
            const command = commandAll[0];

            if (commands.allowed.indexOf(command) == -1) {
                conn.emit('response', {
                    outcome: 'Comando no disponible'
                });
            } else {

                const size = commandAll.length;
                const args = [];

                for (let i = 1; i < size; i++) {
                    args.push(commandAll[i]);
                }

                cp.exec(command, args, data.command, (err, stdout) => {

                    if (stdout) {
                        conn.emit('response', {
                            outcome: stdout
                        });
                        console.log(stdout);
                    } else {
                        conn.emit('response', {
                            outcome: err
                        });
                    }
                });
            }
        });

        fs.watch('/var/log/snmptrapd.log', function (event, filename) {
            console.log('event is: ' + event);
            if (filename) {
                conn.emit('snmptrap', {
                    message: filename
                });
                console.log('filename provided: ' + filename);
            } else {
                console.log('filename not provided');
            }
        });
        /*UDPSocket.getInstance((message, remote) => {

            const data = message.toString('utf8');

            conn.emit('snmptrap', {
                message: data,
                remote: remote
            });
        });*/
    });
    next();
};

exports.register.attributes = {
    name: 'websocket'
};
