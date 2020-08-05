var express = require('express');
var path = require('path');

var app = express();
var port = 8000;

app.get('/', function ( req, res ) {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/v1/categories' , function (req, res) {
	var categories = ['aerobic', 'strength', 'balance', 'flexibility'];
	res.json(categories);
});

app.get('/home', function(req, res) {
	res.redirect(301, '/');
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});