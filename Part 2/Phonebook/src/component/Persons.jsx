const Persons = ({person, deleteButton}) => {

    return (    
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={deleteButton}>delete</button>
      </li> 
    )
   
}
export default Persons