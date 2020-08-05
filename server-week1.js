var express = require('express');
var app = express();

app.get('/', function ( req, res ) {
	res.writeHead(200, 'OK', {'Content-Type': 'text/html'});
	res.write("<H1>Express</h1>");
	res.end();
});

app.get('/api/categories' , function (req, res) {
	var categories = ['aerobic', 'strength', 'balance', 'flexibility'];
	res.json(categories);
});

app.get('/home', function(req, res) {
	res.redirect(301, '/');
});

app.listen(8000, function() {
	console.log("Server running on http://localhost:8000");
});