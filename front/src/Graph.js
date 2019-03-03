import React, { Component } from 'react';
import './App.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

class Graph extends Component {
  minimum;
  maximum;

  data = [
    {time: '19:00', value: 95},
    {time: '19:06', value: 102},
    {time: '19:12', value: 100},
    {time: '19:18', value: 93},
    {time: '19:24', value: 96},
    {time: '19:30', value: 90},
    {time: '19:36', value: 86},
    {time: '19:42', value: 89},
    {time: '19:48', value: 92},
    {time: '19:54', value: 87},
    {time: '20:00', value: 81}
  ]

  processData = (data) => {
    let min = 10000;
    let max = 0;
    for(let i=0; i<data.length; i++){
      if(data[i].value < min) {
        min = data[i].value;
      }
      if (data[i].value >= max) {
          max = data[i].value;
      }
    }

    this.maximum = Math.floor(max * 1.1);
    this.minimum = Math.floor(min * 0.9);
  }

  render() {
    this.processData(this.data);
    return (
      <LineChart width={730} height={250} data={this.data}
        margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal = {false}
          vertical = {false}
          />
        <XAxis dataKey="name">
          <Label value="Number of Occupants" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis dataKey="value"
          type="number"
          domain={[this.minimum, this.maximum]}
          />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    );
  }
}

export default Graph;
