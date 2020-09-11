import React from 'react'
import PropTypes from 'prop-types'

const Persons = ({ keyword, persons, handleDel }) => {
  const personsList = keyword
    ? persons.filter(({ name }) => name.includes(keyword))
    : persons

  return (
    <>
      {personsList.map((p) => (
        <div key={p.name}>
          <span>{p.name}</span> <span>{p.number}</span>{' '}
          <button
            style={{ display: 'inline-block' }}
            onClick={() => handleDel(p.id)}>
            delete
          </button>
        </div>
      ))}
    </>
  )
}

Persons.propTypes = {
  keyword: PropTypes.string.isRequired,
  persons: PropTypes.array.isRequired,
  handleDel: PropTypes.func.isRequired,
}

export default Persons
