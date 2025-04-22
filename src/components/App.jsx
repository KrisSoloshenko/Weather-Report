import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "../styles/app.css";
import Weather from "./Weather";
import FiveDayWeather from "./FiveDayWeather"
import Cities from "./Cities";

function App() {
    const [selectedCity, setSelectedCity] = React.useState("Екатеринбург");

    const handleCitySelect = cityData => {
      setSelectedCity(cityData)
      console.log('Выбран город:', cityData)
    }

    return(
        <>
            <Cities onCitySelect={handleCitySelect}/>
            <Weather selectedCity={selectedCity}/>
            <FiveDayWeather selectedCity={selectedCity}/>
        </>
        
    )
}

export default App