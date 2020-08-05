module.exports = function(request, response, next) {
	var passcode = 'owiteacher';
	if (request.query.passcode === passcode) {
		next();
	} else {
		response.send(401);
	}
}