import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import  request  from 'request';


function OptionItem(props){
  const options = ["Next Hour", "Next 24 Hours", "Next 4 Hours"];
  const layout = {
    marginTop:10
  };
  const processOption = (option) => {
    switch (option) {
    case 1:
      return options[0];
    case 24:
      return options[1];
    case 4:
      return options[2];
    default:
      return option[0]
    }
  }

  const getOccupation = (hours) => {
    const options = {
      method: 'GET',
      uri: 'http://localhost:3000/time/' + hours,
      //uri: 'http://bb78.host.cs.st-andrews.ac.uk:3000/time/' + hours,
    }
  
    request(options, (err, response, body) => {
      if(err) {
        props.onGraphUpdate({success:false})
        return
      }
      props.onGraphUpdate(JSON.parse(body));   
      //console.log(JSON.parse(body))
      //return {success:true, result: JSON.parse(body)};
    })
  }


  return (
    <Grid item xs={12} md={4} spacing={24} className="start-buttons">
      <Button variant="contained"
        style={layout}
        type="submit"
        fullWidth
        color="primary"
        size="large"
        onClick={() => getOccupation(props.option)}>
          {processOption(props.option)}
      </Button>
    </Grid>
  );
}

export default OptionItem;
