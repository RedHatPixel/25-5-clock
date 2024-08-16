import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementBreak, decrementBreak } from "./storeFile/store";
import { updateTimeLeft } from "./storeFile/store";

function BreakControl() {
  const breakLength = useSelector((state) => state.break.length);
  const isRunning = useSelector((state) => state.timer.isRunning);
  const timerType = useSelector((state) => state.timer.timerType);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    if (!isRunning) {
      dispatch(incrementBreak());
      if (timerType === "Break" && breakLength < 60)
        dispatch(updateTimeLeft((breakLength + 1) * 60));
    }
  };

  const handleDecrement = () => {
    if (!isRunning) {
      dispatch(decrementBreak());
      if (timerType === "Break" && breakLength > 1)
        dispatch(updateTimeLeft((breakLength - 1) * 60));
    }
  };

  return (
    <div id="break-control">
      <h2 id="break-label">Break Length</h2>
      <button id="break-decrement" onClick={handleDecrement}>
        -
      </button>
      <span id="break-length">{breakLength}</span>
      <button id="break-increment" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
}

export default BreakControl;
