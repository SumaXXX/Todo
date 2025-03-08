import { useState, useEffect } from 'react';

export function Timer({ _time, setTimerTime, id }) {
  const [time, setTime] = useState(_time);
  const [isRunning, setIsRunning] = useState(false);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Добавим ведущий ноль для секунд
  }

  useEffect(() => {
    let interval = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          setTimerTime(id, newTime); // используем новое значение времени
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Проверка, когда время менее 0
    if (time <= 0 && isRunning) {
      setIsRunning(false);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, time, setTimerTime, id]);

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
        <span className="timer-count">{formatTime(time)}</span>
      </span>
    </div>
  );
}
