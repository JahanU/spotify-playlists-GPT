
import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';



function convertTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  var hDisplay = hrs > 0 ? hrs + (hrs == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = mins > 0 ? mins + (mins == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = secs >= 0 ? secs + (secs == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay
}

export const Timer = () => {

  const [timer, setTimer] = useState(3660);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    let timer = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [paused]);



  return (
    <>
      <h1>Timer</h1>
      <hr></hr>
      {convertTime(timer)}
      <hr></hr>
      <Button onClick={() => setPaused(false)}>Start</Button>
      <Button onClick={() => setPaused(true)}>Pause</Button>

    </>
  );
}