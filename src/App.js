import React, { useEffect, useState } from 'react';

import DarkMode from './components/DarkMode';
import DailyWeather from './components/DailyWeather';
import DayWeather from './components/DayWeather';

import logo_header from './images/header_logo.svg';
import icon_search from './images/search.png';

import './App.css';


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
  const [weatherdaily, setWeatherdaily] = useState({});
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
      return res.json()
    }) 
    .then((response) => {
      response ? setWeatherdaily(response) : setWeatherdaily ({});
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
        return res.json()
      })
      .then((response) => {
       response ? setWeather(response) : setWeather ({})
      if (response) {
        setLon(response.coord.lon);
        setLat(response.coord.lat);
      }
        
      })
      .catch(err => console.error(err))
  }

  return (
      <div className='container'>
        <DarkMode/>
        <SearcField 
        inputHandler = {value => setValue(value)}
        searchHandler = {searchHandler}
        isErrore = {isErrore}
        value = {value}/>

        {isErrore && <p className='invalid_name'>City not found! Please enter the correct city name</p>}

        {weather && weather.main 
        ? <DayWeather weather={weather}/> 
        : null}

        

        {Object.keys(weather).length && Object.keys(weatherdaily).length
        ? <DailyWeather weather={weather} weatherdaily={weatherdaily}/>
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
    <input className='search_input' 
    onChange={inputHandler} 
    type={props.type} 
    placeholder={props.placeholder} 
    value={props.value.trimLeft()} 
    spellCheck="false"/>
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

export default App;
