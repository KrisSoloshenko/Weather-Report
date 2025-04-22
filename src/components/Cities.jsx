import * as React from 'react'
import Select from 'react-select'

import data from "../data/cities.json"
import "../styles/cities.css";

function Cities({onCitySelect}) {
    const options = []
    
    data.map(city => {
        let label = `${city.name} (${city.area})`;
        options.push({ value: city.name, label: label})
    });

    const handleChange = (selectedOptions) => {
        if (onCitySelect && selectedOptions) {
            onCitySelect(selectedOptions.value);
        }
    };
    
    return(
        <div className='header'>
            <span className='city-selector'>WEATHER REPORT</span>
            <span className='city-selector'>
                <Select 
                options={options}
                onChange={handleChange}
                placeholder="Выберете город"
                noOptionsMessage={() => "Город не найден"}
                className='select'
                />
            </span>
        </div>
        
    );
}

export default Cities