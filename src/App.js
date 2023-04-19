import React from 'react';
import WeatherForecast from './WeatherForecast';
import { Typography, AppBar, Toolbar } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';

const App = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant='h3' style={{color:"HighlightText"}}> <CloudIcon fontSize="large" />Weather</Typography>
        </Toolbar>
      </AppBar>
      <WeatherForecast />
    </div>
  )
}

export default App;