import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Header extends Component {
    
  render() {
    const layout = {
        width: 'auto',
        marginLeft: 15,
        marginRight: 15,
        marginTop:15
    };
    
    return(
        <div>
            <AppBar position="static" color="default" >
                <Toolbar>
                <Typography variant="h6" color="inherit" >
                    Jimoku
                </Typography>

                </Toolbar>
                
            </AppBar>
            <div style={layout}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Jimoku
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" component="p">
                    Find out the best time to visit the gym!
                </Typography>
            </div>



        </div>
        
    )
    
  }
}

export default Header;
