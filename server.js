'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 4000;

app.use('/', express.static(__dirname));
app.use('/client', express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/*',function(req,res){
	res.sendFile('index.html',{'root':__dirname + '/client'});
});

app.listen(port, function(){
	console.log('Server running on port ' + port);
});
