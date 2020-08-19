import React, { useState } from 'react';

export default function Login() {

  const [name, setName] = useState();
  const [password, setPassword] = useState();

  // Write a function, if token not supplied or not stored in a cookie, redirect user to login

  // Use react-cookie for cookies in react frontend

  const submitForm = (e) => {
    // get the credentials
    console.log("Submit");
    console.log("UserName", name);
    console.log("Password", password);

    fetch("http://localhost:8000/api/v1/login", {
    method: "POST",
    // when using cookies, include this. Doesnt work with cors
		// credentials: "include",
		headers: {
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.h3A4rGSYKXTkho-O4-CvWpl1hXOJZRsqP_cKpgsnMLw",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then((response) => response.json())
		.then((data) => console.log(data));


    // make request to our server
  }
  const onNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  }
  const onPasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label>username:</label><br />
        <input
          type="text"
          name="username"
          value={name}
          onChange={e => onNameChange(e)} /><br />
        <label>Password:</label><br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => onPasswordChange(e)} />
      </form>
      <button onClick={() => submitForm()}>Submit</button>
    </div>
  )
}