import React, { useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Home } from './components/Home';
import Login from './components/Login';


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
		          </ul>
		        </nav>

		        {/* A <Switch> looks through its children <Route>s and
		            renders the first one that matches the current URL. */}
		        <Switch>
		          <Route path="/login">
		            <Login />
		          </Route>
		          <Route path="/users">
		            {/* <Users /> */}
		          </Route>
		          <Route path="/">
		            <Home />
		          </Route>
		        </Switch>
		      </div>
		    </Router>
	);
}

export default App;