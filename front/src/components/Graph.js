import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';


class Graph extends Component {
  constructor(props){
    super(props);

    this.max = null;
    this.min = null;
    this.data = [];

  }

  


  render() {
    if(!this.props.graphData) 
      return ""

    if (!this.props.graphData.success)
      return(
        
          <h2>Something went wrong</h2>
       
      )
    const graphData = this.props.graphData.result.data;

    // if(!this.max || !this.min)
    //   this.processData(graphData);
    
    return (
      <ResponsiveContainer width="99%" height={320}>
        <LineChart width={730} height={250} data={graphData}
          margin={{ top: 50, right: 30, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal = {false}
            vertical = {false}
            />
          <XAxis dataKey="name">
            <Label Occupancy="" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis dataKey="Occupancy"
            type="number"
            //domain={[this.min, this.max]}
            />
          <Tooltip />
          <Line type="monotone" dataKey="Occupancy" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      
    );
  }
}

export default Graph;
