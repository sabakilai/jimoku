import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import OptionItem from './OptionItem';

function Options(props){
  
  const options = [1, 24, 4];
  return (
    <Grid
      container
      spacing = {8}
      direction="row"
      justify="space-evenly"
      alignItems="center"
    >
      {options.map((option) => {return <OptionItem onGraphUpdate={props.onGraphUpdate} option={option}/>})}
    </Grid>
  );
}
export default Options;
