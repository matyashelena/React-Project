import DarkMode from './components/DarkMode';

import logo_header from './images/header_logo.svg';
import icon_search from './images/search.png';
import icon_thermometer from './images/thermometer.svg'
import icon_humidity from './images/humidity_icon.png';
import icon_evaporator from './images/precipitation.png';
import icon_wind from './images/wind.svg';
import clouds from './images/clouds1.png';
import humidity from './images/humidity1.png';
import rain from './images/rain1.png';
import clear from './images/clear1.png';
import haze from './images/haze.png'
import snow from './images/snow1.png';
import drizzle from './images/drizzle1.png';
import fog from './images/fog.png'
import sunrise_icon from './images/sunrise.png';
import sunset_icon from './images/sunset.png';
import min_temp from './images/min_temp.png';
import max_temp from './images/max_temp1.png';
import './App.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const API_KEY = 'aaa362ec11316d74bc1716de935b46d2';
const API_URL="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const API_URL_DAILY ="https://api.openweathermap.org/data/2.5/forecast?";
const options = {
  method: 'GET'
}
function App() {
  return (
    <div className="App page_wrapper">
      <Page/>
      <BgBlock/>
    </div>
  )
}

function BgBlock() {
  return (
    <div className="bg_url"></div>
  )
}

function Page() {
  const [value, setValue] = useState('');
  const [weather, setWeather] = useState({});
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const [weatherdayly, setWeatherdayly] = useState({});
  const [isErrore, setIsErrore] = useState(false);

  useEffect(() => {
    getWeatherDaily();
  }, [weather, lon, lat])

  function getWeatherDaily() {
    if (!lon || !lat) {
      return false
    }
    let localUrlDaily = `${API_URL_DAILY}lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    fetch(localUrlDaily, options)
    .then((res) => {
      console.log(res);
      return res.json()
    }) 
    .then((response) => {
      response ? setWeatherdayly(response) : setWeatherdayly ({});
      console.log(response);
    })
    .catch(err => console.error(err)) 
  }

  const searchHandler = () => {
    let localUrl = `${API_URL}${value}&appid=${API_KEY}`;
    fetch(localUrl, options)
      .then((res) => {
        if(res.status === 404) {
          setIsErrore(true);
          return false;
        }
        console.log(res);
        return res.json()
      })
      .then((response) => {
       response ? setWeather(response) : setWeather ({})
      //  console.log(response);
      if (response) {
        setLon(response.coord.lon);
        setLat(response.coord.lat);
      }
        
      })
      .catch(err => console.error(err))
  }

  return (
      <div className='container'>
        <SearcField 
        inputHandler = {value => setValue(value)}
        searchHandler = {searchHandler}
        isErrore = {isErrore}
        value = {value}/>

        {weather && weather.main 
        ? <Main weather={weather}/> 
        : null}

        {isErrore && <p className='invalid_name'> City not found</p>}

        {Object.keys(weather).length && Object.keys(weatherdayly).length
        ? <DailyWeather weather={weather} weatherdayly={weatherdayly}/>
        : null}
        
      </div>
  )
}
 
function SearcField(props) {
  const inputHandler = (value) => {
    props.inputHandler(value)
  }

  const searchHandler = () => {
    props.searchHandler && props.searchHandler();
  }
  return (
      
      <header className="header">
         <DarkMode/>
        <Logo/>
      <div className="search">
      <Input type='search' placeholder='search city' value={props.value} onInputChange={inputHandler}/>
      <Button clicker={searchHandler}><img src={icon_search} alt=''/></Button>
        
      </div>
      </header>      
  )
}

function Logo() {
  return (
    <div className="logo">
      <img className="logo_img" src={logo_header} alt=""/>
      <h1 className="header_title">react weather</h1>
      <a href="#"></a>    
    </div>
  )
}

function Input(props) {
  const inputHandler = (e) => {
    e.preventDefault();
    props.onInputChange && props.onInputChange(e.target.value);
  }
  return (
    <input className='search_input' onChange={inputHandler} type={props.type} placeholder={props.placeholder} value={props.value.trimLeft()} spellCheck="false"/>
  )
}

function Button(props) {
  const clickHandler = (e) => {
    e.preventDefault();
    props.clicker && props.clicker();
  }
  return(
    <button onClick={clickHandler}>
      { props.children  }
    </button>
  )
}

function Main(props) {

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

      <div className={toggle === 1 ? "cards_dayly active" : "cards_dayly"}>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>Sunrise</h3>
          <p className='card_dayly-date'>{sunriseRender}</p>
            <img className='card_dayly-img' src={sunrise_icon} alt="" />        
        </div>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>Sunset</h3>
          <p className='card_dayly-date'>{sunsetRender}</p>
          <img className='card_dayly-img' src={sunset_icon} alt="" />
        </div>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>Precipitation probability:</h3>
          <p className='card_dayly-date'>{props.weatherdayly.list[0].pop}%</p>
          <img className='card_dayly-img' src={icon_evaporator} alt="" />
        </div>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>Minimum temperature:</h3>
          <p className='card_dayly-date'>{props.weather.main.temp_min.toFixed(1)}°C</p>
          <img className='card_dayly-img' src={min_temp} alt="" />
        </div>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>Maximum temperature:</h3>
          <p className='card_dayly-date'>{props.weather.main.temp_max.toFixed(1)}°C</p>
          <img className='card_dayly-img' src={max_temp} alt="" />
        </div>
      </div>
    
      <div className={toggle === 2 ? "cards_dayly active" : "cards_dayly"}>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[0].dt_txt).slice(0, -9)}</h3>
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[0].dt_txt).slice(11)}</h3>
          <img className='card_dayly-icon' src={`https://openweathermap.org/img/w/${props.weatherdayly.list[0].weather[0].icon}.png`} alt="" />
          <p className='card_dayly-date'>{(props.weatherdayly.list[0].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_dayly-desc'>{props.weatherdayly.list[0].weather[0].description}</p>
        </div>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[1].dt_txt).slice(0, -9)}</h3>
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[1].dt_txt).slice(11)}</h3>
          <img className='card_dayly-icon' src={`https://openweathermap.org/img/w/${props.weatherdayly.list[8].weather[0].icon}.png`} alt="" />
          <p className='card_dayly-date'>{(props.weatherdayly.list[1].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_dayly-desc'>{props.weatherdayly.list[1].weather[0].description}</p>
        </div>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[2].dt_txt).slice(0, -9)}</h3>
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[2].dt_txt).slice(11)}</h3>
          <img className='card_dayly-icon' src={`https://openweathermap.org/img/w/${props.weatherdayly.list[16].weather[0].icon}.png`} alt="" />
          <p className='card_dayly-date'>{(props.weatherdayly.list[2].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_dayly-desc'>{props.weatherdayly.list[2].weather[0].description}</p>
        </div>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[3].dt_txt).slice(0, -9)}</h3>
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[3].dt_txt).slice(11)}</h3>
          <img className='card_dayly-icon' src={`https://openweathermap.org/img/w/${props.weatherdayly.list[24].weather[0].icon}.png`} alt="" />
          <p className='card_dayly-date'>{(props.weatherdayly.list[3].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_dayly-desc'>{props.weatherdayly.list[3].weather[0].description}</p>
        </div>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[4].dt_txt).slice(0, -9)}</h3>
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[4].dt_txt).slice(11)}</h3>
          <img className='card_dayly-icon' src={`https://openweathermap.org/img/w/${props.weatherdayly.list[32].weather[0].icon}.png`} alt="" />
          <p className='card_dayly-date'>{(props.weatherdayly.list[4].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_dayly-desc'>{props.weatherdayly.list[4].weather[0].description}</p>
        </div>
      </div>

      <div className={toggle === 3 ? "cards_dayly active" : "cards_dayly"}>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[0].dt_txt).slice(0, -9)}</h3>
          <img className='card_dayly-icon' src={`https://openweathermap.org/img/w/${props.weatherdayly.list[0].weather[0].icon}.png`} alt="" />
          <p className='card_dayly-date'>{(props.weatherdayly.list[0].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_dayly-desc'>{props.weatherdayly.list[0].weather[0].description}</p>
        </div>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[8].dt_txt).slice(0, -9)}</h3>
          <img className='card_dayly-icon' src={`https://openweathermap.org/img/w/${props.weatherdayly.list[8].weather[0].icon}.png`} alt="" />
          <p className='card_dayly-date'>{(props.weatherdayly.list[8].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_dayly-desc'>{props.weatherdayly.list[8].weather[0].description}</p>
        </div>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[16].dt_txt).slice(0, -9)}</h3>
          <img className='card_dayly-icon' src={`https://openweathermap.org/img/w/${props.weatherdayly.list[16].weather[0].icon}.png`} alt="" />
          <p className='card_dayly-date'>{(props.weatherdayly.list[16].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_dayly-desc'>{props.weatherdayly.list[16].weather[0].description}</p>
        </div>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[24].dt_txt).slice(0, -9)}</h3>
          <img className='card_dayly-icon' src={`https://openweathermap.org/img/w/${props.weatherdayly.list[24].weather[0].icon}.png`} alt="" />
          <p className='card_dayly-date'>{(props.weatherdayly.list[24].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_dayly-desc'>{props.weatherdayly.list[24].weather[0].description}</p>
        </div>
        <div className="card_dayly">
          <h3 className='card_dayly-date'>{(props.weatherdayly.list[32].dt_txt).slice(0, -9)}</h3>
          <img className='card_dayly-icon' src={`https://openweathermap.org/img/w/${props.weatherdayly.list[32].weather[0].icon}.png`} alt="" />
          <p className='card_dayly-date'>{(props.weatherdayly.list[32].main.temp - 273.15).toFixed()}°C</p>
          <p className='card_dayly-desc'>{props.weatherdayly.list[32].weather[0].description}</p>
        </div>
      </div>
    </div>
  )
} 

export default App;
