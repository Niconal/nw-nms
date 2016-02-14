$('#commandSelect').on('change', 'select', function (e) {
    var netSnmpCommand = document.getElementsByTagName('select')['netSnmpCommand'].value;


    if (netSnmpCommand) {
        if (netSnmpCommand === 'snmpset') {
            document.getElementById('snmpsetContainer').style.display = 'block';
        } else {
            document.getElementById('snmpsetContainer').style.display = 'none';
            document.getElementById('snmpSetValue').value = '';
        }
    }
});

$('#commandSelectV3').on('change', 'select', function (e) {
    var netSnmpCommandV3 = document.getElementsByTagName('select')['netSnmpCommandV3'].value;

    if (netSnmpCommandV3) {

        if(netSnmpCommandV3 === 'snmpset') {

            document.getElementById('snmpSetContainerV3').style.display = 'block';
        } else {

            document.getElementById('snmpSetContainerV3').style.display = 'none';
            document.getElementById('snmpSetValueV3').value = '';
        }
    }
});

$('#authProtocolSelect').on('change', 'select', function (e) {

    var authProtocol = document.getElementsByTagName('select')['authProtocol'].value;

    if(authProtocol === 'null') {

        document.getElementsByTagName('input')['authKey'].disabled = true
        document.getElementsByTagName('select')['privProtocol'].disabled = true
        document.getElementsByTagName('input')['privKey'].disabled = true
    } else {

        document.getElementsByTagName('input')['authKey'].disabled = false
        document.getElementsByTagName('select')['privProtocol'].disabled = false
        document.getElementsByTagName('input')['privKey'].disabled = false

        privProtocol();
    }
});

$('#privProtocolSelect').on('change', 'select', function (e) {

    privProtocol();
});

function privProtocol () {
    var privProtocol = document.getElementsByTagName('select')['privProtocol'].value;

    if(privProtocol === 'null') {

        document.getElementsByTagName('input')['privKey'].disabled = true
    } else {

        document.getElementsByTagName('input')['privKey'].disabled = false
    }
}
