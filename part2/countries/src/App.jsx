import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from 'components/Filter'
import Results from 'components/Results'

const App = () => {
  const [countries, setCountries] = useState([])
  const [keyword, setNewKeyword] = useState('')

  useEffect(() => {
    try {
      fetchCountries()
    } catch (e) {
      console.log(e)
    }
  }, [])

  const fetchCountries = async () => {
    let res = await axios.get(`https://restcountries.eu/rest/v2/all`)
    setCountries(res.data)
  }

  return (
    <div>
      <Filter keyword={keyword} setNewKeyword={setNewKeyword} />
      <Results keyword={keyword} countries={countries} />
    </div>
  )
}

export default App
