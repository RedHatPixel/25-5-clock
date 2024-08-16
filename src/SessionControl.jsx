import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementSession, decrementSession } from "./storeFile/store";
import { updateTimeLeft } from "./storeFile/store";

function SessionControl() {
  const sessionLength = useSelector((state) => state.session.length);
  const isRunning = useSelector((state) => state.timer.isRunning);
  const timerType = useSelector((state) => state.timer.timerType);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    if (!isRunning) {
      dispatch(incrementSession());
      if (timerType === "Session" && sessionLength < 60)
        dispatch(updateTimeLeft((sessionLength + 1) * 60));
    }
  };

  const handleDecrement = () => {
    if (!isRunning) {
      dispatch(decrementSession());
      if (timerType === "Session" && sessionLength > 1)
        dispatch(updateTimeLeft((sessionLength - 1) * 60));
    }
  };

  return (
    <div id="session-control">
      <h2 id="session-label">Session Length</h2>
      <button id="session-decrement" onClick={handleDecrement}>
        -
      </button>
      <span id="session-length">{sessionLength}</span>
      <button id="session-increment" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
}

export default SessionControl;
