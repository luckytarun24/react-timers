import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [inputHour, setInputHour] = useState(0);
  const [inputSecond, setInputSecond] = useState(0);
  const [inputMinute, setInputMinute] = useState(0);

  const [isRunning, SetIsRunning] = useState(false);
  const timerId = useRef();

  const update = () => {
    if (time === 0) {
      clearInterval(timerId.current);
    }
    setTime((value) => value - 1);
  };

  useEffect(() => {
    if (isRunning) {
      timerId.current = setInterval(update, 10);
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
    if (!isRunning) {
      const time =
        (inputHour * 3600000 + inputMinute * 60000 + inputSecond * 1000) / 10;
      setTime(time);
    }
    SetIsRunning(!isRunning);
  };
  const handleReset = () => {
    setTime(0);
    setInputHour(0);
    setInputMinute(0);
    setInputSecond(0);
    SetIsRunning(false);
    clearInterval(timerId.current);
  };
  return (
    <div className="timer">
      <h1>Timer</h1>
      {isRunning ? (
        <div className="time">
          {`${hour.toString().padStart(2, '0')} : ${minute
            .toString()
            .padStart(2, '0')} : ${second
            .toString()
            .padStart(2, '0')} : ${milisecond.toString().padStart(2, '0')}`}
        </div>
      ) : (
        <div>
          <div class="input-box">
            <label>Hour -</label>
            <input
              value={inputHour}
              onChange={(event) => setInputHour(event.target.value)}
            />
          </div>

          <div class="input-box">
            <label>minutes -</label>
            <input
              value={inputMinute}
              onChange={(event) => setInputMinute(event.target.value)}
            />
          </div>
          <div class="input-box">
            <label>seconds -</label>

            <input
              value={inputSecond}
              onChange={(event) => setInputSecond(event.target.value)}
            />
          </div>
        </div>
      )}
      <div className="action">
        <button onClick={handleStartStop}>{`${
          isRunning ? 'Stop' : 'Start'
        }`}</button>
        <button onClick={handleReset}>reset</button>
      </div>
    </div>
  );
};

export default Timer;
