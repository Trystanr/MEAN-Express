import React, { useState } from "react";
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Home } from "./components/Home";
import { Classes } from "./components/Classes";
import { Edit } from "./components/Edit";
import Login from './components/Login';
import ClassDetail from './components/ClassDetail';

import Cookies from 'universal-cookie';
const jwt = require("jsonwebtoken");

const cookies = new Cookies();

function App() {

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});

	if (loading) {
		if (cookies.get("access_token") === undefined) {
			console.log("user is not logged in");
			setLoading(false);
		} else {
			console.log(cookies.get("access_token"));

			jwt.verify(
				cookies.get("access_token"),
				process.env.REACT_APP_ACCESS_TOKEN_SECRET,
				function (err, decoded) {
					if (decoded.id != null) {
						console.log(decoded);
						setData(decoded);
						setLoading(false);
					}
				}
			);
		}
	}
		

	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">
								<strong>Home</strong>
							</Link>
						</li>
						{data.id === undefined && (
							<li>
								<Link to="/login">Login</Link>
							</li>
						)}
						{data.id === undefined && (
							<li>
								<Link to="/register">Register</Link>
							</li>
						)}
						<li>
							<Link to="/classes">My Classes</Link>
						</li>
					</ul>
				</nav>

				<div id="app-content">
					<Switch>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/classes">
							<Classes />
						</Route>
						<Route path="/edit">
							<Edit />
						</Route>
						<Route path="/classdetail/:classid">
							<ClassDetail />
						</Route>
						<Route path="/users">{/* <Users /> */}</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;