import React from 'react'
import { useQuiz } from '../context/QuizContext';

function StartScreen() {
    const { numQuestions, start } = useQuiz();
    return (
        <div className='start'>
            <h2>Welcome to The React Quiz!</h2>
            <h3>{numQuestions} questions to test your React mastery</h3>
            <button className='btn btn-ui' onClick={start}>Let's start</button>
        </div>
    )
}

export default StartScreen