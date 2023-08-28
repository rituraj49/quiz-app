import React from 'react'

function FinishPage({points, totalPoints, highscore, dispatch, answers, correctAns}) {
    const percentage = points / totalPoints * 100;
    let emoji;
    if(percentage === 100) emoji='🥇'
    if(percentage >= 80 && percentage < 100) emoji='🥈'
    if(percentage >= 50 && percentage < 80) emoji='🙃'
    if(percentage >= 0 && percentage < 50) emoji='😊'
  return (
    <>
    <p className='result'>
        <span>{emoji}</span> You scored {points} out of {totalPoints} ({Math.ceil(percentage)}%)
    </p>
    <p style={{}} className='highscore'>
        Highscore : {highscore} points
    </p>
    <div className='' style={{display:'flex', flexDirection:'row', justifyContent:"space-between"}} >
    <p className=''>Your answers: {
        answers.map(a=> <li>{a}</li> )
    }</p>
    <p className =''> Correct answers: 
        {
            correctAns.map(c=> <li>{c}</li>)
        }
    </p >
        </div>
    <button className='btn btn-ui' onClick={()=>dispatch({type:'restart'})}>Restart Quiz</button>
    </>
  )
}

export default FinishPage