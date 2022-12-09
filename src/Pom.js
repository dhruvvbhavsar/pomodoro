import { PauseRounded, PauseSharp, PlayArrow, PlayCircleFilled } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import './Pom.css';


function Pom() {
  const p = <PlayArrow />;
  const f = <PauseSharp />;
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [breakLength, setBreakLength] = useState(5);
  const [state, setState] = useState(false);
  const [mode, setMode] = useState('focus');

  useEffect(() => {
    let timeout;

    if (state) {
      timeout = setTimeout(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (mode === 'focus') {
          setMode('break');
          setMinutes(breakLength);
        } else if (mode === 'break') {
          setMode('focus');
          setMinutes(minutes);
          // Check if break is finished
          if (minutes === 0 && seconds === 0) {
            setState(false);
          }
        }
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [state, minutes, seconds, mode, breakLength]);

  return (
    <div className="MainDiv">
      <h1>Pomodoro App⏱️🍅</h1>
      <div className="headers">
        <h2>Break💤</h2>
        <h2>Focus🌱</h2>
      </div>
      <div className="ips">
        <input
          type="number"
          value={breakLength}
          step = {5}
          onChange={(e) => {
            setBreakLength(Math.min(Math.max(e.target.value, 5), 60));
          }}
        />
        <input
          type="number"
          value={minutes}
          step = {10}
          onChange={(e) => {
            setMinutes(Math.min(Math.max(e.target.value, 0), 60));
            setSeconds(0);
            if (state) setState(false);
          }}
        />
      </div>
      <div className="timer">
        <h3 className={mode === 'focus' ? 'focus' : 'break'}>
          {minutes < 10 ? '0' + minutes : minutes}:{''}
          {seconds < 10 ? '0' + seconds : seconds}
        </h3>
        <button
          onClick={() => {
            setState(!state);
          }}
        >
          {state === false ? p : f}
        </button>
      </div>
    </div>
  );
}

export default Pom;
