import React, { useState } from "react";

import sunrise_icon from '../images/sunrise.png';
import sunset_icon from '../images/sunset.png';
import min_temp from '../images/min_temp.png';
import max_temp from '../images/max_temp1.png';
import icon_evaporator from '../images/precipitation.png';

function DailyWeather(props) {

  const [toggle, setToggle] = useState(1);
  const  toggleTab = (index) => {
    setToggle(index);
  }

  const sunrise = props.weather?.sys?.sunrise || 1600855031;
  const sunriseRender = new Date(sunrise*1000).toLocaleTimeString();
  const sunset = props.weather?.sys?.sunset || 1600855031;
  const sunsetRender = new Date(sunset*1000).toLocaleTimeString();
  
  return (
    <div>
      <div className="block_tabs">
        <div className={toggle === 1 ? "tabs active" : "tabs"} onClick={() => toggleTab(1)}>more details for today</div>
        <div className={toggle === 2 ? "tabs active" : "tabs"} onClick={() => toggleTab(2)}>for the next 24 hours</div>
        <div className={toggle === 3 ? "tabs active" : "tabs"} onClick={() => toggleTab(3)}>for 5 days</div>       
      </div>

      <div className={toggle === 1 ? "cards_daily active" : "cards_daily"}>
        <div className="card_daily">
          <h3 className='card_daily-date'>Sunrise</h3>
          <p className='card_daily-date'>today</p>
          <p className='card_daily-date'>{sunriseRender}</p>
            <img className='card_daily-img' src={sunrise_icon} alt="" />        
        </div>
        <div className="card_daily">
          <h3 className='card_daily-date'>Sunset</h3>
          <p className='card_daily-date'>today</p>
          <p className='card_daily-date'>{sunsetRender}</p>
          <img className='card_daily-img' src={sunset_icon} alt="" />
        </div>
        <div className="card_daily">
          <h3 className='card_daily-date'>Precipitation probability:</h3>
          <p className='card_daily-date'>{(props.weatherdaily.list[0].pop)*100}%</p>
          <img className='card_daily-img' src={icon_evaporator} alt="" />
        </div>
        <div className="card_daily">
          <h3 className='card_daily-date'>Minimum temperature:</h3>
          <p className='card_daily-date'>{props.weather.main.temp_min.toFixed(1)}°C</p>
          <img className='card_daily-img' src={min_temp} alt="" />
        </div>
        <div className="card_daily">
          <h3 className='card_daily-date'>Maximum temperature:</h3>
          <p className='card_daily-date'>{props.weather.main.temp_max.toFixed(1)}°C</p>
          <img className='card_daily-img' src={max_temp} alt="" />
        </div>
      </div>
    
      <div className={toggle === 2 ? "cards_daily active" : "cards_daily"}>
        <div className="card_daily">
          <h3 className='card_daily-date'>{(props.weatherdaily.list[0].dt_txt).slice(0, -9)}</h3>
          <h3 className='card_daily-date'>{(props.weatherdaily.list[0].dt_txt).slice(11)}</h3>
          <img className='card_daily-icon' src={`https://openweathermap.org/img/w/${props.weatherdaily.list[0].weather[0].icon}.png`} alt="" />
          <p className='card_daily-date'>{(props.weatherdaily.list[0].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_daily-desc'>{props.weatherdaily.list[0].weather[0].description}</p>
        </div>
        <div className="card_daily">
          <h3 className='card_daily-date'>{(props.weatherdaily.list[1].dt_txt).slice(0, -9)}</h3>
          <h3 className='card_daily-date'>{(props.weatherdaily.list[1].dt_txt).slice(11)}</h3>
          <img className='card_daily-icon' src={`https://openweathermap.org/img/w/${props.weatherdaily.list[8].weather[0].icon}.png`} alt="" />
          <p className='card_daily-date'>{(props.weatherdaily.list[1].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_daily-desc'>{props.weatherdaily.list[1].weather[0].description}</p>
        </div>
        <div className="card_daily">
          <h3 className='card_daily-date'>{(props.weatherdaily.list[2].dt_txt).slice(0, -9)}</h3>
          <h3 className='card_daily-date'>{(props.weatherdaily.list[2].dt_txt).slice(11)}</h3>
          <img className='card_daily-icon' src={`https://openweathermap.org/img/w/${props.weatherdaily.list[16].weather[0].icon}.png`} alt="" />
          <p className='card_daily-date'>{(props.weatherdaily.list[2].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_daily-desc'>{props.weatherdaily.list[2].weather[0].description}</p>
        </div>
        <div className="card_daily">
          <h3 className='card_daily-date'>{(props.weatherdaily.list[3].dt_txt).slice(0, -9)}</h3>
          <h3 className='card_daily-date'>{(props.weatherdaily.list[3].dt_txt).slice(11)}</h3>
          <img className='card_daily-icon' src={`https://openweathermap.org/img/w/${props.weatherdaily.list[24].weather[0].icon}.png`} alt="" />
          <p className='card_daily-date'>{(props.weatherdaily.list[3].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_daily-desc'>{props.weatherdaily.list[3].weather[0].description}</p>
        </div>
        <div className="card_daily">
          <h3 className='card_daily-date'>{(props.weatherdaily.list[4].dt_txt).slice(0, -9)}</h3>
          <h3 className='card_daily-date'>{(props.weatherdaily.list[4].dt_txt).slice(11)}</h3>
          <img className='card_daily-icon' src={`https://openweathermap.org/img/w/${props.weatherdaily.list[32].weather[0].icon}.png`} alt="" />
          <p className='card_daily-date'>{(props.weatherdaily.list[4].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_daily-desc'>{props.weatherdaily.list[4].weather[0].description}</p>
        </div>
      </div>

      <div className={toggle === 3 ? "cards_daily active" : "cards_daily"}>
        <div className="card_daily">
          <h3 className='card_daily-date'>{(props.weatherdaily.list[0].dt_txt).slice(0, -9)}</h3>
          <img className='card_daily-icon' src={`https://openweathermap.org/img/w/${props.weatherdaily.list[0].weather[0].icon}.png`} alt="" />
          <p className='card_daily-date'>{(props.weatherdaily.list[0].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_daily-desc'>{props.weatherdaily.list[0].weather[0].description}</p>
        </div>
        <div className="card_daily">
          <h3 className='card_daily-date'>{(props.weatherdaily.list[8].dt_txt).slice(0, -9)}</h3>
          <img className='card_daily-icon' src={`https://openweathermap.org/img/w/${props.weatherdaily.list[8].weather[0].icon}.png`} alt="" />
          <p className='card_daily-date'>{(props.weatherdaily.list[8].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_daily-desc'>{props.weatherdaily.list[8].weather[0].description}</p>
        </div>
        <div className="card_daily">
          <h3 className='card_daily-date'>{(props.weatherdaily.list[16].dt_txt).slice(0, -9)}</h3>
          <img className='card_daily-icon' src={`https://openweathermap.org/img/w/${props.weatherdaily.list[16].weather[0].icon}.png`} alt="" />
          <p className='card_daily-date'>{(props.weatherdaily.list[16].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_daily-desc'>{props.weatherdaily.list[16].weather[0].description}</p>
        </div>
        <div className="card_daily">
          <h3 className='card_daily-date'>{(props.weatherdaily.list[24].dt_txt).slice(0, -9)}</h3>
          <img className='card_daily-icon' src={`https://openweathermap.org/img/w/${props.weatherdaily.list[24].weather[0].icon}.png`} alt="" />
          <p className='card_daily-date'>{(props.weatherdaily.list[24].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_daily-desc'>{props.weatherdaily.list[24].weather[0].description}</p>
        </div>
        <div className="card_daily">
          <h3 className='card_daily-date'>{(props.weatherdaily.list[32].dt_txt).slice(0, -9)}</h3>
          <img className='card_daily-icon' src={`https://openweathermap.org/img/w/${props.weatherdaily.list[32].weather[0].icon}.png`} alt="" />
          <p className='card_daily-date'>{(props.weatherdaily.list[32].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_daily-desc'>{props.weatherdaily.list[32].weather[0].description}</p>
        </div>
      </div>
    </div>
  )
} 

export default DailyWeather;