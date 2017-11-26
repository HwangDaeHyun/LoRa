var http = require('https');

var command = process.argv[2];
var body2 = '<?xml version="1.0" encoding = "UTF-8"?>\n' +
    '<m2m:mgc\n' +
    'xmlns:m2m="http://www.onem2m.org/xml/protocols"\n' +
    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n' +
    '<exe>true</exe>\n' +
    '<exra>'+command+'</exra>\n' +
    '</m2m:mgc>';
var options = {

    host: 'thingplugpf.sktiot.com',
    port: 9443,
    path: '/0240771000000174/v1_0/mgmtCmd-00000174d02544fffef01046_extDevMgmt',
    method: 'PUT',
    headers: {
        'uKey': 'STRqQWE5a28zTlJ0QWQ0d0JyZVlBL1lWTkxCOFlTYm4raE5uSXJKTC95eG9NeUxoS3d4ejY2RWVIYStlQkhNSA==',
        'Accept': 'application/json',
        'X-M2M-RI': '00000174d02544fffef01046_0012',
        'X-M2M-Origin': '00000174d02544fffef01046',
        'Content-Type': 'text/xml'
    }

}


var buffer = "";
var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) { buffer = buffer+chunk; });
   res.on('end', function(chunk) {
       console.log(buffer);
   }); 

});
req.on('error', function (e) {
    console.log('problem with request : ' + e.message);
});
req.write(body2);
req.end();

