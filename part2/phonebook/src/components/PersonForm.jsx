import React, { useState } from 'react'
import PropTypes from 'prop-types'

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const addPerson = (e) => {
    e.preventDefault()

    for (const p of persons) {
      if (p.name === newName) {
        return alert(`${newName} is already added to phonebook`)
      }
    }
    return setPersons([
      ...persons,
      {
        name: newName,
        number: newNum,
      },
    ])
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name:{' '}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{' '}
        <input value={newNum} onChange={(e) => setNewNum(e.target.value)} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

PersonForm.propTypes = {
  persons: PropTypes.array.isRequired,
  setPersons: PropTypes.func.isRequired,
}

export default PersonForm
