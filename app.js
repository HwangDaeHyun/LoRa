var express= require('express');
var xmlparser = require('express-xml-bodyparser');
var http = require('https');
var app = express();

var options = {
	host: 'thingplugpf.sktiot.com',
	port: 9443,
	path: '/0240771000000174/v1_0/remoteCSE-00000174d02544fffef01046/container-LoRa/latest',
	method: 'GET',
	headers: {
   	 'uKey': 'STRqQWE5a28zTlJ0QWQ0d0JyZVlBL1lWTkxCOFlTYm4raE5uSXJKTC95eG9NeUxoS3d4ejY2RWVIYStlQkhNSA==',
   	 'Accept': 'application/json',
   	 'X-M2M-RI': '00000174d02544fffef01046_0002',
   	 'X-M2M-Origin': '00000174d02544fffef01046',
	}
}
var result ={
	type: '',
	stat: '',
	cmd:'',
	longtitude: '',
	latitude:'',
}
var buffer = "";
var req = http.request(options, function (res) {
console.log('STATUS: ' + res.statusCode);
res.setEncoding('utf8');
res.on('data',function(chunk){
	var tmp=JSON.parse(chunk);
	console.log("===========================================================");
	if(tmp['cin']['con'][0] == '1'){
		result.type = 'gps';
	}else if(tmp['cin']['con'][0] == '2'){
		result.type = 'gyro seonsor';
	}else{
		result.type = 'undef';
	}
	if(tmp['cin']['con'][1] == '1'){
		result.stat = 'lock';
	}else if(tmp['cin']['con'][1] == '2'){
		result.stat = 'unlock';
	}else{
		result.stat = 'running';
	}
	result.cmd = "undef";
	console.log("type     : " +result.type+"("+tmp['cin']['con'][0]+")");
	console.log("status   : " +result.stat+"("+tmp['cin']['con'][1]+")");
	console.log("command  : " +result.cmd+"("+ tmp['cin']['con'][2]+")");
	console.log("latitude : " + tmp['cin']['con'].slice(3,5) +"."+tmp['cin']['con'].slice(5,7)+tmp['cin']['con'].slice(7,12));
	console.log("longitude: " + tmp['cin']['con'].slice(12,15)+"."+tmp['cin']['con'].slice(15,17)+tmp['cin']['con'].slice(17,22));
	console.log("==========================================================\n");
});
res.on('end',function(chunk){process.exit(0)});
req.on('error', function (e) {
console.log('problem with request : ' + e.message);
});
});
req.end();
