import React, { useState, useEffect } from "react";
import './WeatherForecast.css'

const API_KEY = "2c2995961e879ea7fe8d67371fa19ced";

const WeatherForecast = () => {
  const [city, setCity] = useState("hyderabad");
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
       fetchWeatherForecast();
    }, 5000);
    
  };

  const fetchWeatherForecast = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
      .then((response) => response.json())
      .then((data) => {
                setForecast(data.list);
                setIsLoading(false);
              })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchWeatherForecast();
  });

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes}`;
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
    
    {!forecast && (
      <div className="forecast-search-container">
          <form onSubmit={handleSubmit}>
              <h1 className="heading">Weather Forecast</h1>
              <input type="text"  className="input" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
              <button  type="submit" className="search">Search</button>
              
          </form>
          {
            <strong>Please Enter city name</strong>
          }
      </div>
      
    ) }
   

    {forecast && (
      <div className="forecast-data-container">
      
          <form onSubmit={handleSubmit}>
            
            <h1 className="heading">Weather Forecast</h1>
            <input type="text"  className="input" id="city" placeholder="City" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
            <button className="search" type="submit">Search</button>
            
          
          </form>
          
          {isLoading ? (
               <p>Please wait...</p>
            ) :
            
            <div className="forecast-items-container">
            
            { forecast.map((item) =>  {
              const date = new Date(item.dt_txt);
              if (date.getHours() === 12 && generateDates().includes(date.toDateString())) {
                      return (
                        <div key={item.dt} className="forecast-item">
                              <h4 className="date">{date.toDateString()}, {getCurrentTime()}</h4>
                              <h4 className='a'> {item.weather[0].description} <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt={item.weather[0].description} /> </h4>     
                              <h4 className='b'>Temperature: {item.main.temp} °C</h4>
                              <h4 className='b'>Humidity: {item.main.humidity}%</h4>
                              <h4 className='b'>Wind Speed: {item.wind.speed} km/h</h4>
                          <br></br>      
                        </div>
                      );
              } })
            }
          </div>
          }
      </div> 
    )}
  </div>
  )};
export default WeatherForecast;
