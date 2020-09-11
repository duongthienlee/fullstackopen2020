import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    try {
      fetchWeather(city)
    } catch (e) {
      console.log(e)
    }
  }, [city])

  const fetchWeather = async (city) => {
    let res = await axios.get(
      `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${city}`,
    )
    setWeather(res.data)
  }
  const {
    current: {
      temperature = null,
      weather_icons = null,
      wind_speed,
      wind_dir,
    } = {},
  } = weather
  return (
    <>
      <h3>Weather in {city}</h3>
      {weather.current && (
        <>
          <span>
            <b>temperature: </b> {temperature} Celsius
          </span>
          <br />
          <img alt='weather_icons' src={weather_icons} />
          <br />
          <span>
            <b>wind:</b> {wind_speed} mph direction {wind_dir}
          </span>
        </>
      )}
    </>
  )
}

Weather.propTypes = {
  city: PropTypes.string.isRequired,
}

export default Weather
