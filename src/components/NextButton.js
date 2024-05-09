import React from 'react';
import { useQuiz } from '../context/QuizContext';

const NextButton = () => {
    const { answer, index, numQuestions, finish, nextQuestion } = useQuiz();

    if (answer === null) return null;
    if (index < numQuestions - 1) return (
        <button className='btn btn-ui' onClick={() => {
            // dispatch({ type: "nextQuestion" });
            nextQuestion();
        }}>
            Next
        </button>
    );
    if (index === numQuestions - 1) return (
        <button className='btn btn-ui' onClick={() => {
            // dispatch({ type: "finish" });
            finish();
        }}>
            Finish
        </button>
    );
}

export default NextButton;
