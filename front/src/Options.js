import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
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
      {options.map((option) => {
        return <OptionItem
                  option={option}
                  getTime={props.getTime}
                  />
      })}
    </Grid>
  );
}
export default Options;
