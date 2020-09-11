import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Weather from 'components/Weather'

const Country = ({ country, maximize = true, toggleable = true }) => {
  const [showDetails, setShowDetails] = useState(maximize)
  const { name, capital, population, languages, flag } = country

  return (
    <div style={{ marginTop: 10 }}>
      {toggleable ? (
        <div>
          <span>{name}</span>{' '}
          <button onClick={() => setShowDetails(!showDetails)}>show</button>
        </div>
      ) : (
        <h1>{name}</h1>
      )}
      {showDetails && (
        <>
          <p>capital {capital}</p>
          <p>population {population}</p>
          <h3>Spoken languages</h3>
          <ul>
            {languages.map((lang) => (
              <li key={`${lang.name}-${lang.iso639_1}`}>{lang.name}</li>
            ))}
          </ul>
          <img alt='flag' src={flag} width='100' />
          <Weather city={capital} />
        </>
      )}
      <hr />
    </div>
  )
}

Country.propTypes = {
  country: PropTypes.object.isRequired,
  maximize: PropTypes.bool,
  toggleable: PropTypes.bool,
}

export default Country
