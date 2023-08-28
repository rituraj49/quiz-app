import React from 'react'

function Landing({numQuestions, dispatch}) {
  return (
    <div className='start'>
        <h2>Welcome to the quiz</h2>
        <h3>{numQuestions} question to test your skills</h3>
        <button className='btn btn-ui' onClick={()=>dispatch({type:'start'})}>Let's go</button>
    </div>
  )
}

export default Landing