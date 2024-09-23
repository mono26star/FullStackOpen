import { fetchWeatherApi } from 'openmeteo'
import { useState } from 'react'

const OneCountry = ({filteredCountries, setCountry, country}) => {
    const [temp, setTemp] = useState(0)
    const [windSpeed, setWindSpeed] = useState(0)

    if (country === '') {
        return null
    }

    if (filteredCountries.length === 1) {
        const Country = filteredCountries[0]

        const params = {
            "latitude": Country.latlng[0],
            "longitude": Country.latlng[1],
            "current": ["temperature_2m", "wind_speed_10m"]
        }
        const url = "https://api.open-meteo.com/v1/forecast"
        const responses = fetchWeatherApi(url, params)

        responses.then(r => {
            const current = r[0].current()
            const t = current.variables(0).value()
            const ws = current.variables(1).value()
            setTemp(t)
            setWindSpeed(ws)
        })

        const languages = []
        for (const key in Country.languages)
        {
            if(Country.languages.hasOwnProperty(key))
            {
                languages.push(Country.languages[key])
            }
        }

        console.log(languages)
        return (
            <div>
                <h1>{Country.name.common}</h1>
                <p>capital {Country.capital}</p>
                <p>area {Country.area}</p>
                <h3>languages:</h3>
                <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={Country.flags.png} alt={Country.flags.alt}></img>
                <h2>Weather in {Country.capital}</h2>
                <p>temperature {temp.toFixed(2)} Celcius</p>
                <p>wind {windSpeed.toFixed(2)} m/s</p>
            </div>
        )
    }

    if (filteredCountries.length > 9) {
    return (
    <>
        <p>Too many matches, specify another filter</p>
    </>)
    }
    
    return (
    <>
        {filteredCountries.map(country => 
            <p key={country.area}>
            {country.name.common}
            <button onClick ={() => setCountry(country.name.common)}>show</button></p>)}
    </>
    )
}

export default OneCountry