import React from 'react'
import PropTypes from 'prop-types'

const Persons = ({ persons, handleDel }) => {
  return (
    <>
      {persons.map((p) => (
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
  persons: PropTypes.array.isRequired,
  handleDel: PropTypes.func.isRequired,
}

export default Persons
