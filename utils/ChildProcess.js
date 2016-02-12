'use strict';

class ChildProcess {

    constructor(){
        this.spawn = require('child_process').spawn;
    }

    exec(command, args, next) {

        const ps = this.spawn(command, args);

        ps.stdout.on('data', function (data) {

            const info = data.toString('utf8');
            next(info);
        });

        ps.stdout.on('end', function(data) {
            console.log('ending');
        });

        ps.stderr.on('data', (data) => {

            const info = data.toString('utf8');
            next(info);
        });

        ps.on('exit', function(code) {

            if (code != 0) {
                next(code);
            }
        });
    }
}

exports = module.exports = ChildProcess;
