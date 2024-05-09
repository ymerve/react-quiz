import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';

const Timer = () => {
    const { secondRemainig, tick } = useQuiz();

    const mins = Math.floor(secondRemainig / 60);
    const secs = secondRemainig % 60;

    useEffect(function () {
        const id = setInterval(() => {
            // dispatch({ type: 'tick' });
            tick();
        }, 1000);
        return () => clearInterval(id);
    }, [tick]);
    return (
        <div className='timer'>
            {mins < 10 && "0"}
            {mins}:{secs < 10 && "0"}
            {secs}
        </div>
    );
}

export default Timer;
