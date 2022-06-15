import React, { useState} from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [historicalData, setHistoricalData] = useState("");

  const currentWeatherClick = () => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${query}`
      )
      .then((result) => {
        setCurrentData(result.data.current);
        
        console.log(result.data.current);
      });
  };

  const historicalWeatherClick = () => {
    axios
      .get(
        `http://api.weatherstack.com/historical?access_key=${process.env.REACT_APP_API_KEY}&query=${query}`
      )
      .then((result) => {
        setHistoricalData(result.data.historical);
        console.log(process.env.REACT_APP_API_KEY);
        console.log(result.data.historical);
      });
  };

  return (
    <div className="App">
      <h1>Get weather report of locations</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Enter any location here"
          variant="outlined"
          onChange={(e) => setQuery(e.target.value)}
        />
      </Box>
      
      

      <div spacing={2}>
        <Button variant="outlined" onClick={currentWeatherClick}>
          Current Weather
        </Button>
        <Button variant="outlined" href="#outlined-buttons" onClick={historicalWeatherClick}>
          Historical Weather
        </Button>
      </div>
      <div>
       {currentData && 
          <div>
            <p>"Observation Time": {currentData.observation_time}</p>
            <p>"Temperature": {currentData.temperature}</p>
            <p>"Weather Description": {currentData.weather_descriptions}</p>
            <p>"Pressure": {currentData.pressure}</p>
            <p>"Humidity": {currentData.humidity}</p>
            <p>"Feels-like": {currentData.feelslike}</p>
            </div>
       }
      
      </div>
    </div>
  );
}

export default App;
