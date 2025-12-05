import React, { useState, useEffect, useRef } from "react";
import "../styles/App.css";

function App() {
  const [time, setTime] = useState(0);      // time in centiseconds
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const timerRef = useRef(null);

  // Start the timer
  const startTimer = () => {
    if (!running) {
      setRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10); // 10ms = 1 centisecond
    }
  };

  // Stop the timer
  const stopTimer = () => {
    setRunning(false);
    clearInterval(timerRef.current);
  };

  // Record a lap
  const recordLap = () => {
    if (running) {
      setLaps((prev) => [...prev, time]);
    }
  };

  // Reset everything
  const resetTimer = () => {
    stopTimer();
    setTime(0);
    setLaps([]);
  };

  // Cleanup interval on unmount → prevents memory leaks
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // Utility: Format time
  const formatTime = (t) => {
    const minutes = Math.floor(t / 6000);
    const seconds = Math.floor((t % 6000) / 100);
    const centiseconds = t % 100;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(centiseconds).padStart(2, "0")}`;
  };

  return (
    <div className="container">

      <h1>Lap Timer</h1>

      {/* Timer Display */}
      <div className="timer">{formatTime(time)}</div>

      {/* Controls */}
      <div className="buttons">
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={recordLap}>Lap</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      {/* Laps List */}
      <div className="laps">
        <h2>Laps</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
