import axios from "axios";
import React, { useEffect, useState } from "react";

const Clima = () => {

  const [climate, setClimate] = useState({});

  const [isCelcius, setIsCelcius] = useState (true);

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const long = pos.coords.longitude;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=6ef00522536e9b12feba8acda976d943`
        )
        .then((res) => setClimate(res.data));
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);


  console.log(climate);

  return (
    <div className="card">
      <h1>App Clima</h1>
      <p>
        <b>Ciudad:</b> {climate.name} {","} {climate.sys?.country}
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${climate.weather?.[0].icon}@2x.png`}
        alt=""
      />
      <p>
        <b>Temperatura: </b>
        <i className="fa-thin fa-temperature-three-quarters"></i>
        {isCelcius ? climate.main?.temp : ((climate.main?.temp) * 9/5 ) + 32} 
        {isCelcius ? '°C' : '°F'}
      </p>
      <p>
        <b>Humedad: </b>
      <i className="fa-regular fa-droplet-degree"></i>
      {climate.main?.humidity } {'%'}
      </p>
      <p>
        <b>Viento: </b>
        {climate.wind?.speed} {'m/s'}
      </p>
      <button onClick={() => {setIsCelcius(!isCelcius)}}>
        {isCelcius ? 'Combertir a Fahrenheit' : 'Combertir a Celcius'}
      </button>
    </div>
  );
};

export default Clima;
