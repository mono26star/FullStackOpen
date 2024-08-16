import { useState } from 'react'

const Button = ({ handler, text }) => {
  return(
  <button onClick={handler}>
    {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if ((good + neutral + bad) === 0){
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticAll text="all" good={good} neutral={neutral} bad={bad} />
      <StatisticAverage text="average" good={good} neutral={neutral} bad={bad} />
      <StatisticPositive text="positive" good={good} neutral={neutral} bad={bad} />      
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)}

const StatisticAll = ({text, good, neutral, bad}) => {
  return (
  <tr>
    <td>{text}</td> 
    <td>{good + neutral + bad}</td>
  </tr>
)}

const StatisticAverage = ({text, good, neutral, bad}) => {
  return (
  <tr>
    <td>{text}</td>
    <td>{(good - bad) / (good + neutral + bad)}</td>
  </tr>
)}

const StatisticPositive = ({text, good, neutral, bad}) => {
  return (
  <tr>
    <td>{text}</td> 
    <td>{(good / (good + neutral + bad)) * 100} %</td>
  </tr>
)}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlegood = () => {
    setGood(good + 1)
  }

  const handleneutral = () => {
    setNeutral(neutral + 1)
  }

  const handlebad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={handlegood} text={'good'} />
      <Button handler={handleneutral} text={'neutral'} />
      <Button handler={handlebad} text={'bad'} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App