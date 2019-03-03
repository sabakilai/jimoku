import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function OptionItem(props){
  const options = ["Next Hour", "Today", "Next 4 Hours"];
  const processOption = (option) => {
    switch (option) {
    case 1:
      return options[0];
      break;
    case 24:
      return options[1];
      break;
    default:
      return options[2];
      break;
    }
  }

  return (
    <Grid item xs={12} md={4} spacing={24} className="start-buttons">
      <Button variant="contained"
      color="primary"
      onClick={() => props.getTime(props.option)}>
        {processOption(props.option)}
      </Button>
    </Grid>
  );
}

export default OptionItem;
