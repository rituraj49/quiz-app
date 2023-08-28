import '../App.css';
import { useEffect, useReducer } from 'react';

import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import Landing from './Landing';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishPage from './FinishPage';
import Footer from './Footer';
import Timer from './Timer';

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status:'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore:0,
  secondsRemaining: null,
  answers: [],
  correctAns:[]

};

function reducer(state, action){
  const question = state.questions.at(state.index); 
  const SECS_PER_QUEST = 30;
  // console.log(question.options);
  // console.log(question);
  switch(action.type){
    case 'dataReceived':
      return {
        ...state, 
        questions: action.payload,
        status: 'ready'
      }

      case 'dataFailed':
        return {
          ...state,
          status: 'error'
        }
        
        case 'start':
        return{
          ...state,
          status:'active',
          secondsRemaining: state.questions.length * SECS_PER_QUEST
        }

      case 'newAnswer':
          // const question = state.questions.at(state.index); //state.questions[state.index];
          // console.log(question);
          return {
            ...state,
            answer: action.payload,
            points: 
            action.payload === question.correctOption
              ? state.points + question.points 
              : state.points
        }

      case 'nextQuestion':
        const options = question.options.at(state.answer)
        const corrOpt = question.options.at(question.correctOption)
        return {
          ...state,
          index: state.index + 1,
          answer: null,
          answers:[...state.answers, options],
          correctAns:[...state.correctAns, corrOpt]
        }

      case 'finish':
        const options2 = question.options.at(state.answer)
        const corrOpt2 = question.options.at(question.correctOption)
        return {
          ...state,
          status:'finished',
          highscore: state.points > state.highscore ? state.points : state.highscore,
          answers:[...state.answers, options2],
          correctAns:[...state.correctAns, corrOpt2]
        }
      
      case 'restart':
          return {
            ...initialState,
            questions: state.questions,
            status: 'ready'
          }
          // return {
            
          //   questions: state.questions,
          //   status: 'ready'
          // }

      case 'tick':
        return{
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? 'finished' : state.status
        }
        
      default:
        throw new Error("Action unknown")
  }
}

function App() {
  const[{questions, status, index, answer, 
    points, highscore, secondsRemaining, answers, correctAns}, dispatch] = useReducer(reducer, initialState);
  // console.log(questions.reduce((prev, cur)=>prev + cur.points, 0));
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((prev, cur)=>prev + cur.points, 0)
  useEffect(()=>{
    fetch(`http://localhost:8000/api/get-all`)
    .then((res)=>res.json())
    .then((data)=>{
      // console.log(data.allQuests)
      dispatch({type:'dataReceived', payload:data.allQuests})
    })
    .catch((err)=>{
      // console.log(err)
      dispatch({type:'dataFailed'})
    })
  },[]);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <Landing numQuestions={numQuestions} dispatch={dispatch} /> }
        
        {status === 'active' &&
      <>
        <Progress 
        index={index} 
        numQuestions={numQuestions} 
        totalPoints={totalPoints} 
        points={points} 
        answer={answer}
        />
        
        <Question 
        question={questions[index]} 
        dispatch={dispatch} 
        answer={answer} 
        points={points} />
      <Footer>
        <Timer 
        dispatch={dispatch}
        secondsRemaining={secondsRemaining}
        />
        <NextButton 
        dispatch={dispatch} 
        answer={answer}
        index={index}
        numQuestions={numQuestions}
        />
      </Footer>
      </>
      }

      {status === 'finished' && <FinishPage 
      points={points} 
      totalPoints={totalPoints} 
      highscore={highscore} 
      dispatch={dispatch}
      answers={answers}
      correctAns={correctAns}
      />}
        
      </Main>
      
    </div>
  );
}

export default App;
