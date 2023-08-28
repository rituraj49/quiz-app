import React from 'react'
import Options from './Options';

function Question({question, dispatch, answer, points}) {
    // console.log(question);
    // console.log(points);
  return (
    <div>
      <h3>Your score is: {points}</h3>
        <h4>
            {question.question}
        </h4>
            <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  )
}

export default Question