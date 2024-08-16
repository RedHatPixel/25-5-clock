import React from "react";
import { useSelector } from "react-redux";

function Timer() {
  const { timeLeft, timerType } = useSelector((state) => state.timer);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div id="timer">
      <h2
        id="timer-label"
        style={timerType === "Session" ? { color: "green" } : { color: "red" }}
      >
        {timerType}
      </h2>
      <span id="time-left">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

export default Timer;
