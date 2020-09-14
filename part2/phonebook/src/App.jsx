import React, { useState, useEffect } from 'react'
import Filter from 'components/Filter'
import PersonForm from 'components/PersonForm'
import Persons from 'components/Persons'
import personService from './services/persons'
import Notification from 'components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  })
  const [keyword, setNewKeyword] = useState('')
  const DEFAULT_MSG = { type: null, text: '' }
  const [msg, setMsg] = useState(DEFAULT_MSG)

  useEffect(() => {
    fetchPersons()
  }, [])

  const fetchPersons = async () => {
    try {
      let res = await personService.getAll()
      setPersons(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    let target = persons.find((p) => p.name === newPerson.name)
    if (target) {
      let confirm = window.confirm(
        `${target.name} is already added to phonebook, replace the old number with a new one?`,
      )
      if (!confirm) return null
      else await updatePerson(target.id)
    } else await addPerson()
  }

  const updatePerson = async (targetId) => {
    try {
      let res = await personService.update(targetId, newPerson)
      let shallow = [...persons]
      let indexOfEle = shallow.findIndex((p) => p.id === targetId)
      shallow[indexOfEle] = res.data
      setPersons(shallow)
      setNewPerson({
        name: '',
        number: '',
      })
    } catch (e) {
      if (e.response.status === 404) {
        showNotFoundMsg(targetId)
        setPersons(persons.filter((p) => p.id !== targetId))
      }
    }
  }

  const addPerson = async () => {
    try {
      let res = await personService.create(newPerson)
      setPersons([...persons, res.data])
      setNewPerson({
        name: '',
        number: '',
      })
      if (res.status === 201)
        handleShowNoti({
          type: 'success',
          text: `Added ${newPerson.name}`,
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

  const delPerson = async (targetId) => {
    try {
      let res = await personService.deleteResource(targetId)
      if (res.status === 200) {
        let newList = persons.filter((p) => p.id !== targetId)
        setPersons(newList)
      }
    } catch (e) {
      if (e.response.status === 404) {
        showNotFoundMsg(targetId)
        setPersons(persons.filter((p) => p.id !== targetId))
      }
    }
  }

  const showNotFoundMsg = (id) => {
    const person = persons.find((p) => p.id === id)
    handleShowNoti({
      type: 'error',
      text: `Information of ${person.name} has already been remove from server`,
    })
  }

  /**
   * This function update msg state with provided
   * msg argument then update msg to default message
   * in order to hide notification
   * @param {Object} payload.msg - message object.
   */
  const handleShowNoti = (msg) => {
    setMsg(msg)
    setTimeout(() => {
      setMsg(DEFAULT_MSG)
    }, 5000)
  }

  const personsList = keyword
    ? persons.filter(({ name }) =>
        name.toLowerCase().includes(keyword.toLowerCase()),
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={msg} />
      <Filter keyword={keyword} setNewKeyword={setNewKeyword} />
      <h3>Add a new</h3>
      <PersonForm
        newPerson={newPerson}
        setNewPerson={setNewPerson}
        handleAdd={handleAdd}
      />
      <h3>Numbers</h3>
      <Persons persons={personsList} handleDel={handleDel} />
    </div>
  )
}

export default App
