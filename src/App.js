import logo_header from './images/header_logo.svg';
import icon_search from './images/search.png';
import icon_thermometer from './images/thermometer.svg'
import icon_humidity from './images/humidity.svg';
import icon_evaporator from './images/evaporator.svg';
import icon_wind from './images/wind.svg';
import clouds from './images/clouds.png';
import humidity from './images/humidity.png';
import rain from './images/rain.png';
import clear from './images/clear.png';
import snow from './images/snow.png';
import drizzle from './images/drizzle.png';
import './App.css';
import moment from 'moment';
import Moment from 'react-moment';
import React, { useState } from 'react'

const API_KEY = 'aaa362ec11316d74bc1716de935b46d2';
const API_URL="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const options = {
  method: 'GET'
}
function App() {
  return (
    <div className="App page_wrapper">
      <Page/>
    </div>
  )
}

function Page() {
  const [value, setValue] = useState('');
  const [weather, setWeather] = useState({});

  const searchHandler = () => {
    let localUrl = `${API_URL}${value}&appid=${API_KEY}`;
    // let lon = weather.coord.lon;
    // let lat = weather.coord.lat;
    // let fiveDaysUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    // sata(fiveDaysUrl)
    // console.log(fiveDaysUrl);
    fetch(localUrl, options)
      .then((res) => res.json())
      .then((response) => {
       response.weather ? setWeather(response) : setWeather ({})
        console.log(response);
        console.log(weather);
        console.log(response.weather);
        // console.log(lon);
        // console.log(lat);
        
      })
      .catch(err => console.error(err))


    //   fetch(fiveDaysUrl, options)
    //   .then(response => response.json())
    //   .then(data => {
    //     // Filter the forecasts to get only one forecast per day
    //     console.log(data);
    //     console.log(data.list);


    //     const uniqueForecastDays = [];
    //     const fiveDaysForecast = data.list.filter(forecast => {
    //         const forecastDate = new Date(forecast.dt_txt).getDate();
    //         console.log(forecastDate);
    //         if (!uniqueForecastDays.includes(forecastDate)) {
    //             return uniqueForecastDays.push(forecastDate);
    //         }
    //         console.log(uniqueForecastDays);
    //     });

        

    //     // Creating weather cards and adding them to the DOM
    //     fiveDaysForecast.forEach((weatherItem, index) => {
    //         const html = createWeatherCard(cityName, weatherItem, index);
    //         console.log(index);
    //         console.log(fiveDaysForecast);
    //         if (index === 0) {
    //             currentWeatherDiv.insertAdjacentHTML("beforeend", html);
    //         } else {
    //             weatherCardsDiv.insertAdjacentHTML("beforeend", html);
    //         }
    //     });        
    // }).catch(() => {
    //     alert("An error occurred while fetching the weather forecast!");
    // });


    //   fetch(fiveDaysUrl, options)
    //   .then((res) => res.json())
    //   .then((response) => {
    //    response.weather ? setWeather(response) : setWeather ({})
    //     console.log(response);
    //     console.log(weather);
    //     console.log(response.weather);
    //     console.log(lon);
    //     console.log(lat);
        
    //   })
    //   .catch(err => console.error(err))
  }

  return (
      <div className='container'>
        <SearcField 
        inputHandler = {value => setValue(value)}
        searchHandler = {searchHandler}
        value = {value}/>

        {typeof weather.main !== "undefined" 
        ? <Main weather={weather}/> 
        : <p className='invalid_name'>enter valid city name</p>}

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
        <Logo/>
      <div className="search">
        <Input type='search' placeholder='search city' value={props.value} onInputChange={inputHandler}/>
        <Button clicker={searchHandler}>
        <img src={icon_search} alt=''/>
        </Button>
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
    <input onChange={inputHandler} type={props.type} placeholder={props.placeholder} value={props.value} spellCheck="false"/>
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
    case 'Smoke' || 'Haze':
      icon_weather = humidity;
      break;
    case 'Haze':
      icon_weather = humidity;
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
    default:
      icon_weather = `https://openweathermap.org/img/w/${props.weather.weather[0].icon}.png`;
      break;
  }
  return (

    <main weather={props.weather} className="cards_today">
        <div className="card card_city">
          <div className="weather_header">
            <div className="weather_main">
              <div className="weather_temp">{props.weather.main.temp.toFixed()}°</div>
              <div className="weather_today">Today is: 
                <p className='moment'>{moment().format('dddd')}</p> 
                
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
        </main>
  )
}


export default App;