'use strict';

const commands = require('../config/commands').allowed;
const ChildProcess = require('./ChildProcess');

const cp = new ChildProcess();

exports.register = function(server, options, next) {

    const io = require('socket.io')(server.listener);

    io.on('connection', (conn) => {

        conn.on('snmpCommand', (data) => {

            const commandAll = data.command.split(" ");
            const command = commandAll[0];

            if (commands.indexOf(command) == -1) {
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
    });
    next();
};

exports.register.attributes = {
    name: 'websocket'
};
