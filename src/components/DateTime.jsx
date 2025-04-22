import * as React from "react"

function DateTime({dateTime, temp, feelsLike, weather, humidity, pressure, wind, icon}) {
    return(
    <tr>
        <th>{dateTime}</th>
        <th>{temp.toFixed(0)} ℃</th>
        <th>{feelsLike.toFixed(0)} ℃</th>
        <th><img src={`https://openweathermap.org/img/wn/${icon}.png`} alt={weather}/></th>
        <th>{humidity} %</th>
        <th>{pressure} гПа</th>
        <th>{wind} м/с</th>
    </tr>
    )
}


export default DateTime