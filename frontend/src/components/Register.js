import React, { useState } from 'react';

import { withRouter } from "react-router";

const Register = props => {

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [classes, setClasses] = useState("");

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
		
		var arrClass = [];

		if (classes.length > 0) {
			arrClass = classes.split(",");

			for (var a in arrClass) {
				arrClass[a] = parseInt(arrClass[a], 10); // Explicitly include base as per Álvaro's comment
			}
		}

		var raw = JSON.stringify({ name: name, email: email, password: password, classes: arrClass });

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
		};

		fetch("http://localhost:8000/api/v1/register", requestOptions)
			.then((response) => response.text())
			.then((result) => {
				if (result == "success") {
					// refresh page
					props.history.push("/login");
 
					// props.history.refresh;
				}
				console.log(result);
			})
			.catch((error) => console.log("error", error));


		// make request to our server
	}

	const onNameChange = (e) => {
		setName(e.target.value);
	};

	const onEmailChange = (e) => {
		setEmail(e.target.value);
	}

	const onPasswordChange = (e) => {
		setPassword(e.target.value);
	}

	const onClassChange = (e) => {
		setClasses(e.target.value);
	};


		return (
			<div>
				<h1>Register</h1>
				<form
					id="login-form"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<label>name:</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={(e) => onNameChange(e)}
					/>
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
					<label>classes (seperated by ,):</label>
					<input
						type="text"
						name="classes"
						value={classes}
						onChange={(e) => onClassChange(e)}
					/>
					<button onClick={() => submitForm()}>Submit</button>
				</form>
			</div>
		);

}

export default withRouter(Register);