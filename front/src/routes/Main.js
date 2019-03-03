import React, { Component } from 'react';
import Options from '../components/Options';
import Graph from '../components/Graph';
import Header from '../components/Header';
import Typography from '@material-ui/core/Typography';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {graphData:null}

    this.updateGraphData = this.updateGraphData.bind(this);
  }

  updateGraphData(graphData) {
    this.setState({graphData:graphData});
  }

  render() {
    return (
        <div>
            <Header/>
            <Options onGraphUpdate={this.updateGraphData}/>
            <Graph graphData={this.state.graphData}/>
        </div>
    )
  }
}

export default Main;