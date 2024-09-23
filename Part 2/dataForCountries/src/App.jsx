import { useState, useEffect } from 'react'
import countriesServices from './services/countries'
import OneCountry from './components/oneCountry'

const App = () => {
  const [country, setCountry] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const hook = () => {
    const dataPromise = countriesServices.getCountry()
    dataPromise.then(data => {
      const filtered = data.filter(a => a.name.common.toLowerCase().includes(country.toLowerCase()))
      setFilteredCountries(filtered)
      console.log(filtered)
    })
  }
  useEffect(hook, [country])

  return (
    <div>
      <form>
        find countries <input value={country}
        onChange={handleCountryChange}/>
      </form>
      <OneCountry 
        filteredCountries={filteredCountries} 
        setCountry={setCountry} 
        country={country}/>
    </div>
  )
}
export default App