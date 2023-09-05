import React, { useState, useEffect, useRef } from 'react';

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, SetIsRunning] = useState(false);
  const timerId = useRef();
  useEffect(() => {
    if (isRunning) {
      timerId.current = setInterval(() => setTime((value) => value + 1), 10);
    } else {
      timerId.current && clearInterval(timerId.current);
    }
    () => timerId.current && clearInterval(timerId.current);
  }, [isRunning]);

  const hour = Math.floor(time / 360000);
  const minute = Math.floor((time % 360000) / 6000);
  const second = Math.floor((time % 6000) / 100);
  const milisecond = time % 100;
  const handleStartStop = () => {
    SetIsRunning(!isRunning);
  };
  const handleReset = () => {
    setTime(0);
  };
  return (
    <div className="stop-watch">
      <h1>Stop Watch</h1>
      <div className="time">
        {`${hour.toString().padStart(2, '0')} : ${minute
          .toString()
          .padStart(2, '0')} : ${second
          .toString()
          .padStart(2, '0')} : ${milisecond.toString().padStart(2, '0')}`}
      </div>
      <div className="action">
        <button onClick={handleStartStop}>{`${
          isRunning ? 'Stop' : 'Start'
        }`}</button>
        <button onClick={handleReset}>reset</button>
      </div>
    </div>
  );
};

export default StopWatch;
