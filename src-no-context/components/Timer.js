import { useEffect } from 'react';

const Timer = ({ dispatch, secondRemainig }) => {
    const mins = Math.floor(secondRemainig / 60);
    const secs = secondRemainig % 60;

    useEffect(function () {
        const id = setInterval(() => {
            dispatch({ type: 'tick' });
        }, 1000);
        return () => clearInterval(id);
    }, [dispatch]);
    return (
        <div className='timer'>
            {mins < 10 && "0"}
            {mins}:{secs < 10 && "0"}
            {secs}
        </div>
    );
}

export default Timer;
