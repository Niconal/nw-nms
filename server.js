const Hapi = require('hapi');
const Hoek = require('hoek');
const Inert = require('inert');
const Routes = require('./routes');
const HapiMarko = require('hapi-marko');
const WebSocket = require('./utils/WebSockets');

require('marko/compiler').defaultOptions.writeToDisk = false;

const server = new Hapi.Server();

server.connection({
    port: 3000
});

server.register([{
        register: HapiMarko,
        options: {
            templatesDir: __dirname + '/templates'
        }
    },
    Inert,
    Routes,
    WebSocket,
], (err) => {

    Hoek.assert(!err, err);

    server.start((err) => {

        Hoek.assert(!err, err);
        console.log('Running at: ' + server.info.uri);
    });
});

module.exports = server;
