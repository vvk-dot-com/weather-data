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


const WeatherForecast = () => {
  const [city, setCity] = useState("hyderabad");
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      fetchWeatherForecast();
    }, 3000); //3000ms
  };

  const fetchWeatherForecast = () => {
    setIsLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
      .then((response) => {if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json()})
      .then((data) => {
        if (!data || !data.list || data.list.length === 0) {
          throw new Error("Invalid API response");
        }
        setForecast(data.list);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };
 

  useEffect(() => {
    fetchWeatherForecast();
  }, []);
  
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    // return `${hours}:${minutes}`; // to get time 24hr format
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${time}` //to get time 12hr format
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

  return (
    <div className="forecast-forecast-container">
      
      <form onSubmit={handleSubmit}>
        <h1 >Forecast for {city}</h1> 
        <TextField
          required
          id="outlined-basic" 
          label="Enter City Name" 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          variant="outlined"
          />
        <Button type="submit" className="search" size="large" color="primary" variant="contained" >
          Search
        </Button>

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
                ) {
                  return (
                    <div key={item.dt} className="forecast-item">
                      <p> <CalendarTodayIcon/> {date.toDateString()} </p>
                      <p style={{fontSize:"large"}}> <AccessTimeIcon/> {getCurrentTime()} </p>
                      <p> {item.weather[0].description}
                              <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                              alt={item.weather[0].description} /></p>
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
)}

export default WeatherForecast;