import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Options from './Options';
import Graph from './Graph';

class App extends Component {
  getTime = (window) => {
    console.log("Fetching the time for the next " + window + " hour(s)");
  }

  render() {
    return (
      <div className="App">
        <Typography variant="h2" paragraph={true}>
          Gym Buddy
        </Typography>
        <Typography variant="h5" paragraph={true}>
          Find out the best time to visit the gym!
        </Typography>
        <Options getTime={this.getTime} />
        <Graph />
      </div>
    );
  }
}

export default App;
