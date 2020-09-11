import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from 'components/Filter'
import PersonForm from 'components/PersonForm'
import Persons from 'components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [keyword, setNewKeyword] = useState('')

  useEffect(() => {
    try {
      fetchPersons()
    } catch (e) {
      console.log(e)
    }
  }, [])

  const fetchPersons = async () => {
    let res = await axios.get('http://localhost:3001/persons')
    setPersons(res.data)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter keyword={keyword} setNewKeyword={setNewKeyword} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons keyword={keyword} persons={persons} />
    </div>
  )
}

export default App
