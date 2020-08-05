var express = require('express');
var path = require('path');

var app = express();
var port = 8000;

var urlpath = path.join(__dirname, '../frontend/build/');


// app.use(express.static('public'));

app.get('/', function ( req, res ) {
	// res.sendFile(__dirname + '/frontend/index.html');

	res.sendFile(urlpath);
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