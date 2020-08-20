import React from 'react';
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


function App() {

	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/register">Register</Link>
						</li>
						<li>
							<Link to="/classes">My Classes</Link>
						</li>
						<li>
							<Link to="/edit">Edit Classes</Link>
						</li>
					</ul>
				</nav>

				{/* A <Switch> looks through its children <Route>s and
		            renders the first one that matches the current URL. */}
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
		</Router>
	);
}

export default App;