function snmpCommand() {

    document.getElementById('outcome').innerHTML = '';
    var command = document.querySelector('#command').value;
    connSocket(command);
};

function snmpOptions() {

    var fullCommand= '';
    if (document.getElementById('v2c-tab').classList[1] === 'active') {

        var netSnmpCommand = document.getElementsByTagName('select')['netSnmpCommand'].value;
        var ipV4V6 = document.getElementById('ipV4V6').value;
        var community = document.getElementById('community').value;
        var oid = document.getElementById('oid').value;
        var snmpValue = document.getElementById('snmpValue').value;

        fullCommand = netSnmpCommand + ' -c ' + community + ' -v 2c ' + ipV4V6 + ' ' + oid;

        if(snmpValue){
            fullCommand += ' s ' + snmpValue;
        }

        connSocket(fullCommand);

    } else {

        var ipV4V6 = document.getElementById('ipV4V6').value;
        var command = document.getElementById('command').value;
        var securityName = document.getElementById('securityName').value;
        var authProtocol = document.getElementsByTagName('select')['authProtocol'].value;
        var privProtocol = document.getElementsByTagName('select')['privProtocol'].value;
        var authKey = document.getElementById('authKey').value;
        var privKey = document.getElementById('privKey').value;
        var context = document.getElementById('context').value;

        //fullCommand = command + '-v 3 -n "" -u ' +

        connSocket(fullcommand);

    }


};

var connSocket = function(command) {

    document.getElementById('outcome').innerHTML = '';
    var socket = io('http://localhost:3000');

    socket.emit('snmpCommand', {
        command: command
    });

    socket.on('response', (data) => {
        if (data.outcome != 'false') {

            var resultado = data.outcome;
            document.getElementById('outcome').innerHTML += resultado;
        } else {

            document.getElementById('outcome').innerHTML = 'no';
        }
    });

    return;
};
