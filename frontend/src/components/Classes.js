import React, { Component } from "react";

import ClassView from "./ClassView";

import Cookies from "universal-cookie";
const jwt = require("jsonwebtoken");

const cookies = new Cookies();

export class Classes extends Component {
	state = {
		loading: true,
		selectedUser: -1,
	};

	

	componentDidMount() {		
		this.setState({
			loading: true
		});

		console.log(this);

		var x = this;

		jwt.verify(
			cookies.get("access_token"),
			process.env.REACT_APP_ACCESS_TOKEN_SECRET,
			function (err, decoded) {
				
				console.log("DECODED:");
				console.log(decoded.id);

				x.setState({
					loading: false,
					selectedUser: decoded.id,
				});
				
			}
		);
	}
	
	render() {
		return (
			<div>
				<h1>Taught Classes</h1>
				{this.state.loading ? (
					<div>Loading</div>
				) : (
					this.state.selectedUser !== -1 ?(
						<ClassView userID={this.state.selectedUser} />
					) : (
						<div>You must be logged in</div>
					)
				)}
			</div>
		);
	}
}