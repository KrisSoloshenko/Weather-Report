import * as React from 'react'
import axios from 'axios';
import { Table } from 'react-bootstrap';

import DateTime from './DateTime';
import "../styles/weather.css";

function FiveDayWeather(props) {
    const apiKey = '7660fa1408c6b34dfad79c7b94d8ee11';
    const [fiveDayWeatherData, setFiveDayWeatherData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        if (!props.selectedCity) return;

        let cityName = props.selectedCity
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=ru`
      
        setLoading(true)
        axios
          .get(apiUrl)
          .then((response) => {
            setFiveDayWeatherData(response.data);
            setError(null)
          })
          .catch((error) => {
            console.log(error);
            setError('Ошибка при загрузке данных о погоде');
          })
          .finally(() => {
            setLoading(false)
          });
      }, [props.selectedCity]);

      if (loading && !fiveDayWeatherData) return <h1>Загрузка ...</h1>
      if (error) return <h1>{error}</h1>
      if (!fiveDayWeatherData) return <h1>Выберете город</h1>

      return (
        <>
          <h1>Прогноз на 5 дней в городе {fiveDayWeatherData.city.name}</h1>
          <Table striped hover responsive variant='primary' className='weather'>
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Темпертаура</th>
                    <th>Ощущается как</th>
                    <th>Погода</th>
                    <th>Влажность</th>
                    <th>Давление</th>
                    <th>Ветер</th>
                </tr>
            </thead>
            <tbody>
                    {fiveDayWeatherData.list.map((item) => (<DateTime 
                    key={item.dt}
                    dateTime={item.dt_txt}
                    temp={item.main.temp}
                    feelsLike={item.main.feels_like}
                    weather={item.weather[0].description}
                    humidity={item.main.humidity}
                    pressure={item.main.pressure}
                    wind={item.wind.speed}
                    icon={item.weather[0].icon}              
                    />))}
            </tbody>
          </Table>
        </>
      );
    }

export default FiveDayWeather