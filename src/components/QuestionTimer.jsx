import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeOut }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  useEffect(() => {
    console.log("SETTING TIMEOUT");
    const timer = setTimeout(onTimeOut, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [onTimeOut, timeout]);
  useEffect(() => {
    console.log("SETTING TIME INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <progress id="question" max={timeout} value={remainingTime}></progress>
    </>
  );
}
