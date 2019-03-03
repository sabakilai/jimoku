import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './routes/Main';


class App extends Component {
  render() {
    return (
		<Router>
			<div>
				<div className="container">
					<Switch>
						<Route exact path="/" component={ Main } />
					</Switch>
				</div>
			</div>
		</Router>
    );
  }
}

export default App;
