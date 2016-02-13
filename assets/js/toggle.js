$('#commandSelect').on('change', 'select', function (e) {
    var netSnmpCommand = document.getElementsByTagName('select')['netSnmpCommand'].value;
    if(netSnmpCommand === 'snmpset') {
        document.getElementById('snmpsetContainer').style.display = 'block';
    } else {
        document.getElementById('snmpsetContainer').style.display = 'none';
        document.getElementById('snmpValue').value = '';
    }
});
