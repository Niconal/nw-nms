'use strict';
const Path = require('path');
const Fs = require('fs');

exports.register = function(server, options, next) {

    server.route([{
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply.marko('index', {
                message: 'Networks System Manager'
            });
        }
    }, {
        method: 'GET',
        path: '/traps',
        handler: function (request, reply) {

            Fs.readFile('/var/log/snmptrapd.log', 'utf8', function(err, data){
                console.log()
                reply.marko('traps', {
                    err: err,
                    info: data
                })
            });
        }
    }, {
        method: 'GET',
        path: '/assets/{path*}',
        config: {
            handler: {
                directory: {
                    path: Path.join(__dirname, 'assets'),
                    index: false,
                    redirectToSlash: false
                }
            }
        }
    }]);

    server.ext('onPreResponse', function(request, reply) {
        if (!request.response.isBoom) {
            return reply.continue();
        }
        reply.marko('errors/404', {
            error: 'Recurso no encontrado!'
        })

    });
    next();
};

exports.register.attributes = {
    name: 'routes'
}
