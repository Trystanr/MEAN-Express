import React, { useState, Component } from "react";

import ClassView from "./ClassView";

import Cookies from "universal-cookie";
const jwt = require("jsonwebtoken");

const cookies = new Cookies();

export class Classes extends Component {
	
	render() {
				return (
					<div>
						<h1>Taught Classes</h1>
						<ClassView userID="5" />
					</div>
				);
			}
}