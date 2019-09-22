import React, { useState } from 'react';

const TIMER_STORAGE = 'timer_storage';

const App = () => {
  const [timeInSecs, setTimeInSecs] = useState(Number(localStorage.getItem(TIMER_STORAGE)) || 0);
  const [intervalValue, setIntervalValue] = useState(null);

  const toggleTimer = () => {
    if (!intervalValue) {
      setIntervalValue(setInterval(() => {
        setTimeInSecs((previousTime) => {
          const updatedTimer = previousTime + 1;
          localStorage.setItem(TIMER_STORAGE, updatedTimer);
          return updatedTimer;
        });
      }, 1000));
    } else {
      clearInterval(intervalValue);
      setIntervalValue(null);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalValue);
    setIntervalValue(null);
    setTimeInSecs(0);
    localStorage.setItem(TIMER_STORAGE, 0);
  };

  const formattedTime = (new Date(1000 * timeInSecs).toISOString().substr(11, 8));

  return (
    <div>
      <h1>Hello, World!</h1>
      <p>{formattedTime}</p>
      <button type="button" onClick={toggleTimer}>
        {!intervalValue ? 'Start' : 'Stop' }
        Timer
      </button>
      <button type="button" onClick={resetTimer}>
        Reset Timer
      </button>
    </div>
  );
};

export default App;
