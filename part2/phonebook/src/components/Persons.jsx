import React from 'react'
import PropTypes from 'prop-types'

const Persons = ({ keyword, persons }) => {
  const personsList = keyword
    ? persons.filter(({ name }) => name.includes(keyword))
    : persons

  return (
    <>
      {personsList.map((p) => (
        <p key={p.name}>
          {p.name} <span>{p.number}</span>
        </p>
      ))}
    </>
  )
}

Persons.propTypes = {
  keyword: PropTypes.string.isRequired,
  persons: PropTypes.array.isRequired,
}

export default Persons
