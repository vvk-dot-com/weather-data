import React, { useState, useEffect } from "react";
import './WeatherForecast.css'
import { API_KEY } from "./config";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button, TextField, CircularProgress } from "@mui/material";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterIcon from '@mui/icons-material/Water';
import AirIcon from '@mui/icons-material/Air';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; 
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';



const WeatherForecast = () => {
  const [city, setCity] = useState("hyderabad"); //custom city feature
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false); //"please wait" delay

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); //"please wait" enable for below time delay (3000ms)
    setTimeout(() => {
      fetchWeatherForecast();
    }, 3000); //3000ms
  };

  const fetchWeatherForecast = () => {
    setIsLoading(true); 
    fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=${API_KEY}&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        setForecast(data.list);
        setIsLoading(false); //"please wait" disable and got the forecast.
      })
      .catch((error) => console.log(error));
  };
 
  useEffect(() => {
    fetchWeatherForecast();
  }, []);
  
  const getCurrentTime = () => {
    const now = new Date();
    // const hours = now.getHours();
    // const minutes = now.getMinutes();
    // return `${hours}:${minutes}`; // to get the time 24hr format
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${time}` //to get the time 12hr format
  };

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toDateString());
    }
    return dates;
  };
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="background-wallpaper">
    <div className="forecast-forecast-container">
      
      <form onSubmit={handleSubmit}>
        <h1 >Forecast for {city.toUpperCase()}</h1> 
        <Button 
          type="click" 
          onclick={refreshPage} 
          variant="outlined" 
          color="secondary"
          style={{marginRight:"10px"}}> <RefreshIcon/> </Button>
        <TextField
          required
          id="outlined-basic" 
          label="Enter City Name" 
          size="small"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          variant="outlined"
          />
         
        <Button 
          type="submit" 
          className="search" 
          size="large" 
          color="secondary" 
          variant="outlined"  
          style={{marginLeft:"10px"}}> <SearchIcon/> </Button>

      </form>

      {!forecast  &&  (
        <div className="forecast-search-container">
          <h1>Please Refresh the page and Enter valid city name</h1>
        </div>
      )}

      {forecast  && (
        <div className="forecast-data-container">
          {isLoading ? 
          (
            <h2 style={{alignItems:"center"}}> <CircularProgress /> Please wait...</h2>
          ) :  (
            <div className="forecast-items-container">
              {forecast.map((item) => {
                const date = new Date(item.dt_txt);
                if (
                  date.getHours() === 21 &&
                  generateDates().includes(date.toDateString())
                ) 
                {
                  return (
                    <div key={item.dt} className="forecast-item">
                      <p> <CalendarTodayIcon/> {date.toDateString()} </p>
                      <p style={{fontSize:"large"}}> <AccessTimeIcon/> {getCurrentTime()} </p>
                      <p> {item.weather[0].description} <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt=" " /></p>
                      <p style={{fontSize:"large", color:"black"}}> <ThermostatIcon/>  {item.main.temp} °C </p>
                      <p style={{fontSize:"large", color:"black"}}> <WaterIcon/> {item.main.humidity}% </p>
                      <p style={{fontSize:"large", color:"black"}}> <AirIcon/> {item.wind.speed} km/h </p>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      )}
    </div>
    </div>
)}

export default WeatherForecast;