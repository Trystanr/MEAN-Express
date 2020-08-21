import React, { useState } from 'react';

import { withRouter } from "react-router";

import Cookies from "universal-cookie";
const jwt = require("jsonwebtoken");

const cookies = new Cookies();

const Logout = (props) => {

	console.log("logging out");
	cookies.remove("access_token");
	props.history.push("/login");

	return (
		<div>
			<h1>Log out</h1>
		</div>
	);
};

export default withRouter(Logout);