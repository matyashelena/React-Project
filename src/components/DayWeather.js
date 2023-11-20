import React from "react";
import moment from 'moment';

import icon_thermometer from '../images/thermometer.svg'
import icon_humidity from '../images/humidity_icon.png';
import icon_evaporator from '../images/precipitation.png';
import icon_wind from '../images/wind.svg';
import clouds from '../images/clouds1.png';
import humidity from '../images/humidity1.png';
import rain from '../images/rain1.png';
import clear from '../images/clear1.png';
import haze from '../images/haze.png'
import snow from '../images/snow1.png';
import drizzle from '../images/drizzle1.png';
import fog from '../images/fog.png'

function DayWeather(props) {

  let icon_weather;
  const icon_desc = props.weather.weather[0].main;
  switch (icon_desc) {
    case 'Clouds':
      icon_weather = clouds;
      break;
    case 'Smoke':
      icon_weather = humidity;
      break;
    case 'Fog':
      icon_weather = fog;
      break;  
    case 'Haze':
      icon_weather = haze;
      break;
    case 'Rain':
      icon_weather = rain;
      break;
    case 'Clear':
      icon_weather = clear;
      break;
    case 'Snow':
      icon_weather = snow;
      break;
    case 'Drizzle':
      icon_weather = drizzle;
      break;
    case 'Mist':
      icon_weather = humidity;
      break;
    default:
      icon_weather = `https://openweathermap.org/img/w/${props.weather.weather[0].icon}.png`;
      break;
  }
  return (
    <div weather={props.weather} className="cards_today">
        <div className="card card_city">
          <div className="weather_header">
            <div className="weather_main">
              <div className="weather_temp">{props.weather.main.temp.toFixed()}°</div>
              <div className='moment'>{moment().format('dddd')} 
              </div>
            </div>
            <div className="weather_icon">
              <img src={icon_weather} alt=''/>
            </div>
          </div>
          <div className='weather_time'>{moment().format('LL')}</div>
          <div className="weather_time">Now: {new Date().toLocaleTimeString()}</div>
          <div className="weather_city">City: {props.weather.name}</div>
        </div>
        <div className="card card_feel">
          <div className="card_feel-item">
            <div className="icon">
              <img className="img_term" src={icon_thermometer} alt=""/>
            </div>
            <p className="card_feel-name">temperature {props.weather.main.temp.toFixed()}°</p>
            <p className="card_feel-like">Feels like: {props.weather.main.feels_like.toFixed()}°</p>
          </div>
          <div className="card_feel-item">
            <div className="icon">
              <img className="img_term" src={icon_humidity} alt=""/>
            </div>
            <p className="card_feel-name">humidity</p>
            <p className="card_feel-like">{props.weather.main.humidity}%</p>
          </div>
          <div className="card_feel-item">
            <div className="icon">
              <img className="img_term" src={icon_evaporator} alt=""/>
            </div>
            <p className="card_feel-name">precipitation</p>
            <p className="card_feel-like">{props.weather.weather[0].description}</p>
          </div>

          <div className="card_feel-item">
            <div className="icon">
              <img className="img_term" src={icon_wind} alt=""/>
            </div>
            <p className="card_feel-name">wind</p>
            <p className="card_feel-like">{props.weather.wind.speed.toFixed(1)} m/s</p>
          </div>
          
        </div>
    </div>
  )
}
export default DayWeather;