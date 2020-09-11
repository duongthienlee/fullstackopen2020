import React, { useState, useEffect } from 'react'
import Filter from 'components/Filter'
import PersonForm from 'components/PersonForm'
import Persons from 'components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  })

  const [keyword, setNewKeyword] = useState('')

  useEffect(() => {
    try {
      fetchPersons()
    } catch (e) {
      console.log(e)
    }
  }, [])

  const fetchPersons = async () => {
    let res = await personService.getAll()
    setPersons(res.data)
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    let target = persons.find((p) => p.name === newPerson.name)
    if (target) {
      let confirm = window.confirm(
        `${target.name} is already added to phonebook, replace the old number with a new one?`,
      )
      if (!confirm) return null
      else await updatePerson(target)
    } else await createPerson()
  }

  const updatePerson = async (target) => {
    try {
      await personService.update(target.id, newPerson)
      let shallow = [...persons]
      let indexOfEle = shallow.findIndex((p) => p.id === target.id)
      shallow[indexOfEle] = newPerson
      setPersons(shallow)
      setNewPerson({
        name: '',
        number: '',
      })
    } catch (e) {
      console.log(e)
    }
  }

  const createPerson = async () => {
    try {
      let res = await personService.create(newPerson)
      setPersons([...persons, res.data])
      setNewPerson({
        name: '',
        number: '',
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleDel = async (id) => {
    let target = persons.find((p) => p.id === id)
    let confirm = window.confirm(`Delete ${target.name} ?`)
    if (!confirm) return null
    else await delPerson(id)
  }

  const delPerson = async (id) => {
    try {
      let res = await personService.deleteResource(id)
      if (res.status === 200) {
        let newList = persons.filter((p) => p.id !== id)
        setPersons(newList)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter keyword={keyword} setNewKeyword={setNewKeyword} />
      <h3>Add a new</h3>
      <PersonForm
        newPerson={newPerson}
        setNewPerson={setNewPerson}
        handleAdd={handleAdd}
      />
      <h3>Numbers</h3>
      <Persons keyword={keyword} persons={persons} handleDel={handleDel} />
    </div>
  )
}

export default App
