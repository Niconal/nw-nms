function snmp(){
    var socket = io('http://localhost:3000');

    document.getElementById('outcome').innerHTML = '';
    var command = document.querySelector('#command').value;


    socket.emit('snmpCommand',  {command: command});

    socket.on('response', (data) => {
        if (data.outcome != 'false') {
            var resultado = data.outcome;
            document.getElementById('outcome').innerHTML += resultado;
        } else {
            document.getElementById('outcome').innerHTML = 'no';
        }
    });
}
