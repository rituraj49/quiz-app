import React from 'react'

function Progress({index, numQuestions, totalPoints, points, answer}) {
  return (
    <header className='progress'>
        <progress max={numQuestions} value={index + Number(answer !== null)} />
        <p>Question <strong>{index + 1}</strong> / {numQuestions} </p>
        <p> Your score <strong>{points}</strong> / {totalPoints} </p>    
    </header>
  )
}

export default Progress