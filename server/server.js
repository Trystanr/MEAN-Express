var express = require('express');
var path = require('path');

require('dotenv').config();
const jwt = require("jsonwebtoken");

var cors = require('cors');

const bcrypt = require("bcrypt");

var authenticator = require('./authenticator');
var logger = require('./logger');

var data = require('./data.js');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
var port = 8000;

var corsOptions = {
	// Unsafe, use specific domain only
	origin: "*",
	optionsSuccessStatus: 200,
};

var urlpath = path.join(__dirname, '../frontend/build/');

app.use(logger);

// Can disable if using the react build
app.use(cors(corsOptions));

app.use(express.static(urlpath));

app.use(cookieParser());
app.use(bodyParser.json());
// app.use(authenticator);

app.param('name', function (req, res, next) {
	req.lowerName = req.params.name.toLowerCase();
	next();
});


app.get('/', function ( req, res ) {
	res.send(urlpath);
});



app.get('/api/v1/all' , function (req, res) {
	res.json(data);
});


/* CLASS */

// A list of all the classes
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

// Individual Class Data
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


/* PROJECT */

// Get Projects
app.get('/api/v1/projects', function(req,res) {
	var projectRes = [];

	for (var i = data.projects.length - 1; i >= 0; i--) {
		projectRes.push(data.projects[i]);
	}

	if (req.query.limit >= 0) {
		res.json(projectRes.slice(0, req.query.limit));
	} else {
		res.json(projectRes);
	}
});

// Get Project
app.get('/api/v1/project/:projectID', function(req,res) {
	var projectID = parseInt(req.params.projectID);
	res.json(data.projects[projectID-1]);
});

// Get Project Brief
app.get('/api/v1/project/:projectID/brief', function(req,res) {
	var projectID = parseInt(req.params.projectID);
	res.json(data.projects[projectID-1].brief);
});


/* TEACHER */

// Get teacher by teacher ID
app.get('/api/v1/teacher/:teacherID', function(req,res) {
	var teacherID = parseInt(req.params.teacherID);

	res.json({"name":data.teachers[teacherID-1].name,"email":data.teachers[teacherID-1].email})
});

// Get classes taught by teacher ID
app.get('/api/v1/teacher/:teacherID/classes', function(req,res) {
	var teacherID = parseInt(req.params.teacherID);
	var classRes = [];

	for (var i = data.classes.length - 1; i >= 0; i--) {
		if (data.teachers[teacherID-1].classes.includes(data.classes[i].id)) {
			classRes.push({
				id: data.classes[i].id,
				slot: data.classes[i].slot,
				subject: data.classes[i].subject,
				group: data.classes[i].group,
				classroom: data.classes[i].classroom,
			});
		}
	}

	if (req.query.limit >= 0) {
		res.json(classRes.slice(0, req.query.limit));
	} else {
		res.json(classRes);
	}
});


/* LEARNER */

// Get learner by learner ID
app.get('/api/v1/learner/:learnerID', function(req,res) {
	var learnerID = parseInt(req.params.learnerID);

	res.json({"name":data.learners[learnerID-1].name})
});

// Get classes taken by learner ID
app.get('/api/v1/learner/:learnerID/classes', function(req,res) {
	var learnerID = parseInt(req.params.learnerID);
	var classRes = [];

	for (var i = data.classes.length - 1; i >= 0; i--) {
		if (data.learners[learnerID-1].classes.includes(data.classes[i].id)) {
			classRes.push({"id":data.classes[i].id,"slot":data.classes[i].slot,"subject":data.classes[i].subject,"group":data.classes[i].group,"classroom":data.classes[i].classroom});
		}
	}

	if (req.query.limit >= 0) {
		res.json(classRes.slice(0, req.query.limit));
	} else {
		res.json(classRes);
	}
});

/* USER ID */

// Get ID by passing in ?email and ?password
// app.get('/api/v1/login', function(req,res) {
// 	var teacherIndex = -1;

// 	for (var i = data.teachers.length - 1; i >= 0; i--) {
// 		if (data.teachers[i].email == req.query.email) {
// 			teacherIndex = i;
// 		}
// 	}

// 	if ((teacherIndex != -1) && (req.query.password == data.teachers[teacherIndex].password)) {
// 		res.json(data.teachers[teacherIndex].id);
// 	} else {
// 		res.status(400).send("Invalid details.");
// 	}
// });

app.get('/home', function(req, res) {
	res.redirect(301, '/');
});

var fs = require('fs');

var userFilePath = __dirname + '/users.json';

app.post('/api/v1/register', (req, res) => {
	var registerDetails = req.body;
	console.log(registerDetails);

	if (!fs.existsSync(userFilePath)) {
		var arrData = {
			"users": []
		};

		fs.writeFile(userFilePath, JSON.stringify(arrData, null, 2), (err) => {
			if (err) throw err;

			console.log("data written");
		})
	}

	let rawData = fs.readFileSync(userFilePath);
	let users = JSON.parse(rawData);

	let lastID = users.teachers[users.teachers.length-1].id;
	registerDetails.id = lastID+1;

	bcrypt.hash(registerDetails.password, 2, (err,hash) => {
		registerDetails.hashedPass = hash;

		users.teachers.push(registerDetails);

		fs.writeFile(userFilePath, JSON.stringify(users, null, 2), (err) => {
			if (err) throw err;

			console.log("data written");
		});

		res.send("success");
	});

	
});

// Get information from the user
app.post('/api/v1/login', (req, res) => {
	var loginDetails = req.body;

	console.log(loginDetails);

	// TODO: Validate that the user exists in the database/datafile
	let rawData = fs.readFileSync(userFilePath);
	let users = JSON.parse(rawData);

	// console.log(users);

	var bUser = {};
	for (let i = 0; i < users.teachers.length; i++) {
		if (users.teachers[i].email == loginDetails.email) {
			bUser = users.teachers[i];
		}
	}

	if (bUser!=={}) {

		bcrypt.compare(loginDetails.password, bUser.hashedPass, (err,result) => {
			if (result == true) {
				// Correct password given, write cookie

				const token = jwt.sign(
					{ email: loginDetails.email, id: bUser.id },
					process.env.ACCESS_TOKEN_SECRET
				);

				// res.json({ "hello":"world" });
				res.cookie("access_token", token).send("success");
			} else {
				// Wrong password given
				res.json({error: "incorrect password"});
			}
		})
	}

	// res.json({token: token});
	// res.json();
});

app.post('/api/v1/protected', authenticator, (req,res) => {
	res.json(req.user);

	// Apply authorization header to options parameter of fetch function
});

app.get("/*", (req, res) => {
	res.sendFile(urlpath+'index.html');
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});