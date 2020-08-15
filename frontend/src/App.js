import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

	function formatBool(bool) {
		if (bool) {
			return "Hello";
		} else {
			return "Goodbaye";
		}
	}

	const [boolVal, setBoolVal] = useState(false);

	const buttonClick = () => {
		setBoolVal(!boolVal)
	}

	return (
		<div className="App">
		    <header className="App-header">
		    	<img src={logo} className="App-logo" alt="logo" />
		    	<p>
		    	  Edit <code>src/App.js</code> and save to reload.
		    	</p>
		    	<a
		    	  className="App-link"
		    	  href="https://reactjs.org"
		    	  target="_blank"
		    	  rel="noopener noreferrer"
		    	>
		    	  {formatBool(boolVal)}
		    	</a>

		    	<button onClick={buttonClick}>Click</button>
		    </header>

      
    	</div>
	);
}

export default App;