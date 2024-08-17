import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handler} >{props.text}</button>
)}

const Vote = (props) => {
  return (
    <button onClick={props.voteHandler} >{props.text}</button>
)}

const MostVotes = (props) => {
  return (
    <>
    <div>{props.anecdotes[props.mostVote]}</div>
    <div>has {props.points[props.mostVote]} votes</div>
    </>
)}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const handler = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteHandler = () => {
    const copy = [...points]
    copy[selected] = copy[selected] + 1
    setPoints(copy)
  }

  const mostVote = () => {
    let mostPoints = 0
    for(let i = 1; i < points.length; i++) {
      if (points[i] > points[mostPoints]) {
          mostPoints = i
      }
    }
    return mostPoints
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has {points[selected]} points</div>
      <Button handler={handler} text="next anecdote" />
      <Vote voteHandler={voteHandler} text="vote"/>
      <h1>Anecdote with the most votes</h1>
      <MostVotes anecdotes={anecdotes} points={points} mostVote={mostVote()} />
    </div>
  )
}

export default App