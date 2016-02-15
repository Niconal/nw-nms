var socket = '';

window.onload = function() {
    $('.alert-autocloseable-danger').hide();
    socket = io('http://192.168.1.7:3000');
    var count = 0;
    socket.on('snmptrap', function(data){
        count++;

        document.getElementsByClassName('countTraps')[0].innerHTML = count;
        document.getElementsByClassName('countTraps')[1].innerHTML = count;
        document.getElementsByClassName('countTraps')[0].className = 'label label-danger countTraps';

        $('.alert-autocloseable-danger').show();
        document.getElementById('messageTrap').innerHTML= 'nuevas traps registradas en '+data.message + 'ver traps generadas <a href="http:192.168.1.7:3000/traps">aquí</a>';
        $('.alert-autocloseable-danger').delay(15000).fadeOut("slow", function() {
            // Animation complete.
            $('#autoclosable-btn-danger').prop("disabled", false);
        });

        console.log(data);
    });
};

function snmpCommand() {

    document.getElementById('outcome').innerHTML = '';
    var command = document.querySelector('#command').value;
    connSocket(command);
};

function snmpOptions() {

    var fullCommand = '';
    if (document.getElementById('v2c-tab').classList[1] === 'active') {

        var netSnmpCommand = document.getElementsByTagName('select')['netSnmpCommand'].value;
        var ipV4V6 = document.getElementById('ipV4V6').value;
        var community = document.getElementById('community').value;
        var oid = document.getElementById('oid').value;
        var snmpSetValue = document.getElementById('snmpSetValue').value;

        if (netSnmpCommand != 'snmptrap') {

            fullCommand = netSnmpCommand + ' -c ' + community + ' -v 2c ' + ipV4V6 + ' ' + oid;

            if (snmpSetValue) {
                fullCommand += ' s ' + snmpValue;
            }
        }
        console.log(fullCommand);
        connSocket(fullCommand);

    } else {

        var command = document.getElementsByTagName('select')['netSnmpCommandV3'].value;
        var ipV4 = document.getElementById('ipv4').value;
        var userName = document.getElementById('userName').value;
        var authProtocol = document.getElementsByTagName('select')['authProtocol'].value;
        var privProtocol = document.getElementsByTagName('select')['privProtocol'].value;
        var authKey = document.getElementById('auth-key').value;
        var privKey = document.getElementById('priv-key').value;
        var oidv3 = document.getElementById('oidv3').value;
        var snmpSetValueV3 = document.getElementById('snmpSetValueV3').value;

        if (netSnmpCommand != 'snmptrap') {
            if (authProtocol === 'null') {

                fullCommand = command + ' -v 3 -n "" -u ' + userName + ' -l noAuthNoPriv ' + ipV4 + ' ' + oidv3;
            } else if (authProtocol && privProtocol == 'null') {

                fullCommand = command + ' -v 3 -n "" -u ' + userName + ' -a ' + authProtocol + ' -A ' + authKey + ' -l authNoPriv ' + ipV4 + ' ' + oidv3;
            } else {
                fullCommand = command + ' -v 3 -n "" -u ' + userName + ' -a ' + authProtocol + ' -A ' + authKey + ' -x ' + privProtocol + ' -X ' + privKey + ' -l authPriv ' + ipV4 + ' ' + oidv3;
            }

            if (snmpSetValueV3) {

                fullCommand += ' s ' + snmpSetValueV3;
            }
        }
        console.log(fullCommand);
        connSocket(fullCommand);

    }


};

var connSocket = function(command) {

    document.getElementById('outcome').innerHTML = '';

    socket.emit('snmpCommand', {
        command: command
    });

    socket.on('response', function(data) {
        if (data.outcome != 'false') {

            var resultado = data.outcome;
            document.getElementById('outcome').innerHTML += resultado;
        } else {

            document.getElementById('outcome').innerHTML = 'no';
        }
    });

    return;
};
