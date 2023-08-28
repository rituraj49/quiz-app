import React, { useEffect } from 'react'

function Timer({dispatch, secondsRemaining}) {
    const hours = secondsRemaining / 3600;
    const rhours = Math.floor(hours);
    // console.log(hours);
    const minutes = hours - rhours;
    const rmins = Math.floor(minutes * 60);
    // const mins = Math.floor(secondsRemaining / 60) 
    // mins > 60 ? mins : (mins = mins)
    const seconds = secondsRemaining % 60;
    useEffect(()=>{
        const id = setInterval(()=>{
            dispatch({type: 'tick'})
        },1000)

        return ()=> clearInterval(id);
    },[dispatch]);
  return (
    <div className='timer'>
       {rhours}:{ rmins < 10 && '0'}{rmins} : { seconds < 10 && '0'}{seconds}
    </div>
  )
}

export default Timer