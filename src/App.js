import logo from './logo.svg';

import logo_header from './images/header_logo.svg';
import icon_search from './images/search.png';
import icon_thermometer from './images/thermometer.svg'
import icon_humidity from './images/humidity.svg';
import icon_evaporator from './images/evaporator.svg';
import icon_wind from './images/wind.svg';
import './App.css';

// const API_KEY = 'aaa362ec11316d74bc1716de935b46d2';
import React, { useState } from 'react'

const API_KEY = 'aaa362ec11316d74bc1716de935b46d2';
const API_URL="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

function App() {
  const [value, setValue] = useState('');
  const [weather, setWeather] = useState({});
  const icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
  

  const searchHandler = () => {
    let localUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${value}&appid=${API_KEY}`;
    fetch(localUrl)
      .then((res) => res.json())
      .then((response) => {
        setWeather(response);
        console.log(response);
      })
  }

  return (
    <div className="App page_wrapper">
      <div className="container">
      <header className="header">
        <div className="logo">
          <img className="logo_img" src={logo_header} alt=""/>
          <h1 className="header_title">react weather</h1>
          <a href="#"></a>
        </div>
        
        <div className="search">

          <input onChange={(e) => setValue(e.target.value)} type="text" placeholder="search city" spellCheck="false"/>
          <button onClick={searchHandler}>
            <img src={icon_search}/>
          </button>

      </div>
      </header>

      <main className="cards_today">
        <div className="card card_city">
          <div className="weather_header">
            <div className="weather_main">
              <div className="weather_temp">{weather.main.temp.toFixed()}°</div>
              <div className="weather_today">Today</div>
            </div>
            <div className="weather_icon">
              <img src={icon} alt=''/>
            </div>
          </div>
          <div className="weather_time">Now: 14:45</div>
          <div className="weather_city">City: {weather.name}</div>
        </div>
        <div className="card card_feel">
          <div className="card_feel-item">
            <div className="icon">
              <img className="img_term" src={icon_thermometer} alt=""/>
            </div>
            <p className="card_feel-name">temperature {weather.main.temp.toFixed()}°</p>
            <p className="card_feel-like">Feels like: {weather.main.feels_like.toFixed()}°</p>
          </div>
          <div className="card_feel-item">
            <div className="icon">
              <img className="img_term" src={icon_humidity} alt=""/>
            </div>
            <p className="card_feel-name">humidity</p>
            <p className="card_feel-like">{weather.main.humidity}%</p>
          </div>
          <div className="card_feel-item">
            <div className="icon">
              <img className="img_term" src={icon_evaporator} alt=""/>
            </div>
            <p className="card_feel-name">precipitation</p>
            <p className="card_feel-like">{weather.weather[0].main}</p>
          </div>

          <div className="card_feel-item">
            <div className="icon">
              <img className="img_term" src={icon_wind} alt=""/>
            </div>
            <p className="card_feel-name">wind</p>
            <p className="card_feel-like">{weather.wind.speed.toFixed(1)} m/s</p>
          </div>
          
        </div>
      </main>
      </div>
    </div>
  )
}
// import axios from 'axios'

// function App() {
//   const [data, setData] = useState({})
//   const [location, setLocation] = useState('')

//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`

//   const searchLocation = (event) => {
//     if (event.key === 'Enter') {
//       axios.get(url).then((response) => {
//         setData(response.data)
//         console.log(response.data)
//       })
//       setLocation('')
//     }
//   }

//   return (
//     <div className="app">
//       <div className="search">
//         <input
//           value={location}
//           onChange={event => setLocation(event.target.value)}
//           onKeyDown={searchLocation}
//           placeholder='Enter Location'
//           type="text" />
//       </div>
//       <div className="container">
//         <div className="top">
//           <div className="location">
//             <p>{data.name}</p>
//           </div>
//           <div className="temp">
//             {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
//           </div>
//           <div className="description">
//             {data.weather ? <p>{data.weather[0].main}</p> : null}
//           </div>
//         </div>

//         {data.name !== undefined &&
//           <div className="bottom">
//             <div className="feels">
//               {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
//               <p>Feels Like</p>
//             </div>
//             <div className="humidity">
//               {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
//               <p>Humidity</p>
//             </div>
//             <div className="wind">
//               {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
//               <p>Wind Speed</p>
//             </div>
//           </div>
//         }



//       </div>
//     </div>
//   );
// }

export default App;