import { useState, useEffect } from 'react';

export function Timer({ _time, setTimerTime, id }) {
  const [time, setTime] = useState(_time);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        setTimerTime(id, time);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    if (time < 0) {
      setTime((prevTime) => prevTime + 1);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  return (
    <div>
      <span className="description timer">
        <button className="icon icon-play" onClick={startTimer}></button>
        <button className="icon icon-pause" onClick={pauseTimer}></button>
        <span className="timer-count">{time} sec</span>
      </span>
    </div>
  );
}
