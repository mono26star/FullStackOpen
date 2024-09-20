import { useState, useEffect } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import personService from './services/persons'
import Notification from './component/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')
  const [addMessage, setAddMessage] = useState('')
  const [isSuccessful, setIsSuccessful] = useState(true)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
  })
  }
  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const found = persons.find((v) => {
      return v.name === nameObject.name
    })
    console.log(found)
    if (found !== undefined) {
      const msg = `${found.name} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(msg)) {
        personService
          .replace(found.id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson ))
            setNewName('')
            setNewNumber('')  
            setIsSuccessful(true)
            setAddMessage(`Added new number ${newNumber}`)
            setTimeout(() => {
              setAddMessage(null)
            }, 5000) 
          })
          .catch(error => {
            setIsSuccessful(false)
            setAddMessage(`Information of ${found.name} has already been removed from server`)
            alert(
              `the person '${found.name}' was already deleted from server`
            )
            setPersons(persons.filter(person => person.id !== found.id))
          })
      }
      return
    }
    
    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setIsSuccessful(true)
        setAddMessage(`Added ${newName}`)
        setTimeout(() => {
          setAddMessage(null)
        }, 5000) 
  })
  }

  const deleteButton = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`) === true) {
      personService
        .remove(id)
        setPersons(persons.filter(person => person.id !== id))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setfilterName(event.target.value)
  }

  const personsToShow = filterName === ''
    ? persons
    : persons.filter(person => person.name.search(filterName) !== -1)
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={addMessage} isSuccessful={isSuccessful} />

      <Filter value={filterName} onChange={handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm onSubmit={addName} newName={newName} onNameChange={handleNameChange} 
        newNumber={newNumber} onNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <ul>
        {personsToShow.map(person =>
          <Persons 
            key={person.id} 
            person={person}
            deleteButton={() => deleteButton(person.id)} 
          />
        )}
      </ul>
    </div>
  )
}

export default App