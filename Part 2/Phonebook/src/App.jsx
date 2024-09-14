import { useState } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const found = persons.find((v) => {
      v.name === nameObject.name
    })

    if (found !== undefined)
    {
      alert(newName + ' is already added to phonebook')
      return
    }
    
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
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

      <Filter value={filterName} onChange={handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm onSubmit={addName} newName={newName} onNameChange={handleNameChange} 
        newNumber={newNumber} onNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App