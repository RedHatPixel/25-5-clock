import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { startStopTimer } from "./storeFile/store";

function Controls({ handleReset }) {
  const isRunning = useSelector((state) => state.timer.isRunning);
  const dispatch = useDispatch();

  const handleStartStop = () => {
    dispatch(startStopTimer());
  };

  return (
    <div id="controls">
      <button id="start_stop" className="start-stop" onClick={handleStartStop}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button id="reset" onClick={handleReset}>
        Reset
      </button>
      <audio
        id="beep"
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
}

export default Controls;
