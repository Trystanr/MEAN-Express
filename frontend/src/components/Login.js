import React, { useState } from 'react';

import { withRouter } from "react-router";

const Login = props => {

	const [email, setEmail] = useState("email@email.com");
	const [password, setPassword] = useState("pass1");

	// Write a function, if token not supplied or not stored in a cookie, redirect user to login

	// Use react-cookie for cookies in react frontend

	const submitForm = (e) => {
		// get the credentials
		console.log("Submit");
		console.log("Email:", email);
		console.log("Password:", password);
		
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Access-Control-Allow-Headers", "Set-Cookie");

		var raw = JSON.stringify({ email: email, password: password });

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
		};

		fetch("http://localhost:8000/api/v1/login", requestOptions)
			.then((response) => response.text())
			.then((result) => {
				if (result == "success") {
					// refresh page
					props.history.push("/");
 
					// props.history.refresh;
				}
				console.log(result);
			})
			.catch((error) => console.log("error", error));


		// make request to our server
	}

	const onEmailChange = (e) => {
		console.log(e.target.value);
		setEmail(e.target.value);
	}

	const onPasswordChange = (e) => {
		console.log(e.target.value);
		setPassword(e.target.value);
	}


		return (
			<div>
				<h1>Login</h1>
				<form
					id="login-form"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<label>email:</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={(e) => onEmailChange(e)}
					/>
					<label>password:</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={(e) => onPasswordChange(e)}
					/>
					<button onClick={() => submitForm()}>Submit</button>
				</form>
			</div>
		);

}

export default withRouter(Login);