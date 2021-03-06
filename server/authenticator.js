const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
	// var passcode = 'owiteacher';
	// if (request.query.passcode === passcode) {
	// 	next();
	// } else {
	// 	response.send(401);
	// }

	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) {
		return res.sendStatus(401);
	} 

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		console.log(err);

		if (err) {
			return res.sendStatus(403);
		}

		req.user = user;

		next();
	});
}