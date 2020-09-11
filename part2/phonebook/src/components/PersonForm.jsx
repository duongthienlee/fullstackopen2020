import React from 'react'
import PropTypes from 'prop-types'

const PersonForm = ({ handleAdd, newPerson, setNewPerson }) => {
  const handleChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleAdd}>
      <div>
        name:{' '}
        <input
          required
          value={newPerson.name}
          name='name'
          onChange={handleChange}
        />
      </div>
      <div>
        number:{' '}
        <input
          required
          value={newPerson.number}
          name='number'
          onChange={handleChange}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

PersonForm.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  newPerson: PropTypes.object.isRequired,
  setNewPerson: PropTypes.func.isRequired,
}

export default PersonForm
