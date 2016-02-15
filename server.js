const Hapi = require('hapi');
const Hoek = require('hoek');
const Inert = require('inert');
const Routes = require('./routes');
const HapiMarko = require('hapi-marko');
const WebSocket = require('./utils/WebSockets');
const config = require('./config/app');
const commands = require('./config/commands').allowed
const UDPSocket = require('./utils/UDPSocket');

require('marko/compiler').defaultOptions.writeToDisk = false;

const server = new Hapi.Server();

server.connection({
    host: config.host,
    port: config.port
});

server.register([
    Inert,
    Routes, {
        register: HapiMarko,
        options: {
            templatesDir: __dirname + '/templates'
        }
    }, {
        register: WebSocket,
        options: {
            allowed: commands
        }
    }
], (err) => {

    Hoek.assert(!err, err);

    server.start((err) => {

        Hoek.assert(!err, err);
        console.log('Running at: ' + server.info.uri);
    });
});

module.exports = server;
