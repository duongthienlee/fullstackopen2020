import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const AnecdoteView = ({ anecdote }) => (
  <>
    <div>{anecdote.text}</div>
    <div>has {anecdote.votes} votes</div>
  </>
)
AnecdoteView.propTypes = {
  anecdote: PropTypes.shape({
    text: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }),
}

const AnecdoteControl = ({ handleVote, changeAnecdote }) => (
  <>
    <button onClick={handleVote}>vote</button>
    <button onClick={changeAnecdote}>next anecdote</button>
  </>
)
AnecdoteControl.propTypes = {
  handleVote: PropTypes.func.isRequired,
  changeAnecdote: PropTypes.func.isRequired,
}

const AnecdoteStats = ({ anecdotesMap }) => {
  const allAnecdotes = Object.values(anecdotesMap)
  let popularAnecdotes = []
  let max = -Infinity

  // loop through all anecdotes to find most votes one
  for (const anecdote of allAnecdotes) {
    // skip find if votes === 0
    if (anecdote.votes !== 0) {
      if (anecdote.votes > max) {
        max = anecdote.votes
        popularAnecdotes = [anecdote]
      } else if (anecdote.votes === max) popularAnecdotes.push(anecdote) // push if there are tied
    }
  }

  return (
    <>
      <h2>Anecdote with most votes</h2>
      {popularAnecdotes.map((anecdote) => (
        <>
          <AnecdoteView key={anecdote.text} anecdote={anecdote} />
          <br />
        </>
      ))}
    </>
  )
}
AnecdoteStats.propTypes = {
  anecdotesMap: PropTypes.object.isRequired,
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)

  // generate hash with key as index of each item in anecdotes array.
  const hash = {}
  anecdotes.forEach((item, i) => {
    hash[i] = { text: item, votes: 0 }
  })

  const [anecdotesMap, updateAnecdotesMap] = useState(hash)

  const changeAnecdote = () => {
    const max = anecdotes.length
    const randomNum = Math.floor(Math.random() * max)
    setSelected(randomNum)
  }

  const handleVote = () => {
    const currentAnecdotes = anecdotesMap[selected]
    updateAnecdotesMap({
      ...anecdotesMap,
      [selected]: { ...currentAnecdotes, votes: currentAnecdotes.votes + 1 },
    })
  }

  return (
    <>
      <AnecdoteView anecdote={anecdotesMap[selected]} />
      <AnecdoteControl
        handleVote={handleVote}
        changeAnecdote={changeAnecdote}
      />
      <AnecdoteStats anecdotesMap={anecdotesMap} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
