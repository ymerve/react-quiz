import React from 'react';
import { useQuiz } from '../context/QuizContext';

const Options = () => {
    const { questions, index, answer, newAnswer } = useQuiz();
    const hasAnswered = answer !== null;
    return (
        <div className="options">
            {
                questions[index].options.map((option, ind) =>
                    <button className={`btn btn-option
                        ${ind === answer ? "answer" : ""}
                        ${hasAnswered ?
                            ind === questions[index].correctOption ? "correct" : "wrong"
                            : ""
                        }
                    `} key={option}
                        onClick={() => {
                            newAnswer(index);
                        }}
                        disabled={hasAnswered}
                    >{option}</button>
                )
            }
        </div>
    );
}

export default Options;
