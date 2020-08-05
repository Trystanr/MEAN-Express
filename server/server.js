var express = require('express');
var path = require('path');

var authenticator = require('./authenticator');
var logger = require('./logger');

var data = require('./data.js');

var app = express();
var port = 8000;

var urlpath = path.join(__dirname, '../frontend/build/');


app.use(logger);
app.use(express.static(urlpath));
app.use(authenticator);

app.get('/', function ( req, res ) {
	res.send(urlpath);
});

app.get('/api/v1/all' , function (req, res) {
	res.json(data);
});

app.get('/api/v1/categories' , function (req, res) {
	var categories = ['aerobic', 'strength', 'balance', 'flexibility'];
	res.json(categories);
});

app.get('/api/v1/classes', function(req,res) {
	var classList = data.classes;
	var classRes = [];

	for (var i = data.classes.length - 1; i >= 0; i--) {
		classRes.push(data.classes[i]);
	}

	if (req.query.limit >= 0) {
		res.json(classRes.slice(0, req.query.limit));
	} else {
		res.json(classRes);
	}
});

app.get('/api/v1/class/:classID', function(req,res) {
	var classID = parseInt(req.params.classID);
	var classItem = data.classes[classID-1]; // ID does not start at zero

	// Get teacher
	var teachers=[];
	for (var i = data.teachers.length - 1; i >= 0; i--) {
		if (data.teachers[i].classes.includes(classID)) {
			teachers.push(data.teachers[i].name);
		}
	}

	//Get students
	var learners=[];
	for (var i = data.learners.length - 1; i >= 0; i--) {
		if (data.learners[i].classes.includes(classID)) {
			learners.push(data.learners[i].name);
		}
	}

	//Get slots
	var slot;
	for (var i = data.slots.length - 1; i >= 0; i--) {
		if (data.slots[i].slot == classItem.slot) {
			slot = data.slots[i].times;
		}
	}

	res.json({"class":classItem.subject,"classnumber":classItem.classroom,"teachers":teachers,"learners":learners, "slots":slot});
});

app.get('/home', function(req, res) {
	res.redirect(301, '/');
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});