import React from 'react'
import PropTypes from 'prop-types'
import Country from 'components/Country'

const Results = ({ keyword, countries }) => {
  const filteredCnt = countries.filter(({ name }) =>
    name.toLowerCase().includes(keyword.toLowerCase()),
  )
  if (!keyword) return null
  if (filteredCnt.length > 10)
    return <p>Too many matches, specify another filter</p>
  else if (filteredCnt.length > 1)
    return filteredCnt.map((country) => (
      <Country maximize={false} key={country.name} country={country} />
    ))
  else if (filteredCnt.length === 1)
    return <Country toggleable={false} country={filteredCnt[0]} />
  else return <p>Not Found</p>
}

Results.propTypes = {
  keyword: PropTypes.string.isRequired,
  countries: PropTypes.array.isRequired,
}

export default Results
