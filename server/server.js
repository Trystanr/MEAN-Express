var express = require('express');
var path = require('path');
var logger = require('./logger');

var app = express();
var port = 8000;

var urlpath = path.join(__dirname, '../frontend/build/');


app.use(logger);
app.use(express.static(urlpath));

app.get('/', function ( req, res ) {
	res.send(urlpath);
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