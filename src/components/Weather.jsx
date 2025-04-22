import * as React from 'react'
import axios from 'axios';
import { Table } from 'react-bootstrap';

import "../styles/weather.css";

function Weather(props) {
    const apiKey = 'API KEY';
    const [weatherData, setWeatherData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        if (!props.selectedCity) return;

        let cityName = props.selectedCity
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=ru`

        setLoading(true)
        axios
          .get(apiUrl)
          .then((response) => {
            setWeatherData(response.data);
            setError(null)
          })
          .catch((error) => {
            console.log(error);
            setError('Ошибка при загрузке данных о погоде')
          })
          .finally(() => {
            setLoading(false)
          });
      }, [props.selectedCity]);

      if (loading && !weatherData) return <h1>Загрузка ...</h1>
      if (error) return <h1>{error}</h1>
      if (!weatherData) return <h1>Выберете город</h1>

      return (
        <>
          <h1>Погода сейчас в городе {weatherData.name}</h1>
          <Table striped hover responsive variant='primary' className='weather'>
            <thead>
                <tr>
                    <th>Темпертаура</th>
                    <th>Ощущается как</th>
                    <th>Погода</th>
                    <th>Влажность</th>
                    <th>Давление</th>
                    <th>Ветер</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>{weatherData.main.temp.toFixed(0)} ℃</th>
                    <th>{weatherData.main.feels_like.toFixed(0)} ℃</th>
                    <th><img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description}/></th>
                    <th>{weatherData.main.humidity} %</th>
                    <th>{weatherData.main.pressure} гПа</th>
                    <th>{weatherData.wind.speed} м/с</th>
                </tr>
            </tbody>
          </Table>
        </>
      );
    }

export default Weather