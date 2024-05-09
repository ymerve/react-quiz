import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTIONS = 30;

const initialState = {
    questions: [],
    // 'loading, 'error', 'ready', 'active', 'finished'
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondRemainig: 10,
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            };
        case "dataFailed":
            return {
                ...state,
                status: "error",
            };
        case "start":
            return {
                ...state,
                status: "active",
                secondRemainig: state.questions.length * SECS_PER_QUESTIONS,
            };
        case "newAnswer":
            const question = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case "nextQuestion":
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            };
        case "finish":
            return {
                ...state,
                status: "finished",
                highscore:
                    state.points > state.highscore
                        ? state.points
                        : state.highscore,
            };
        case "restart":
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
            };
        case "tick":
            return {
                ...state,
                secondRemainig: state.secondRemainig - 1,
                status: state.secondRemainig === 0 ? "finished" : state.status,
            };
        default:
            throw new Error("Action unknown");
    }
}

function QuizProvider({ children }) {
    const [
        { questions, status, index, answer, points, highscore, secondRemainig },
        dispatch,
    ] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce(
        (prev, cur) => prev + cur.points,
        0
    );

    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => {
                // dispatch({ type: "dataReceived", payload: data });
                dataReceived(data);
            })
            .catch((err) => {
                // dispatch({ type: "dataFailed" });
                dataFailed();
            });
    }, []);

    function dataReceived(questions) {
        dispatch({ type: "dataReceived", payload: questions });
    }
    function dataFailed() {
        dispatch({ type: "dataFailed" });
    }
    function start() {
        dispatch({ type: "start" });
    }
    function newAnswer(answer) {
        dispatch({ type: "newAnswer", payload: answer });
    }
    function nextQuestion() {
        dispatch({ type: "nextQuestion" });
    }
    function finish() {
        dispatch({ type: "finish" });
    }
    function restart() {
        dispatch({ type: "restart" });
    }
    function tick() {
        dispatch({ type: "tick" });
    }
    const quiz_context_value = {
        status,
        index,
        points,
        numQuestions,
        maxPossiblePoints,
        answer,
        questions,
        secondRemainig,
        highscore,
        dataReceived,
        dataFailed,
        start,
        newAnswer,
        nextQuestion,
        finish,
        restart,
        tick,
    };
    return (
        <QuizContext.Provider value={quiz_context_value}>
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined)
        throw new Error("QuizContext was used outside the QuizProvider ");
    return context;
}

export { QuizProvider, useQuiz };
