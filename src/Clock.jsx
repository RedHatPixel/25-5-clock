import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  tick,
  resetTimer,
  playAudio,
  resetAudio,
  resetBreak,
  resetSession,
  startStopTimer,
} from "./storeFile/store";
import BreakControl from "./BreakControl";
import SessionControl from "./SessionControl";
import Timer from "./Timer";
import Controls from "./Controls";

function Clock() {
  const dispatch = useDispatch();
  const isRunning = useSelector((state) => state.timer.isRunning);
  const timeLeft = useSelector((state) => state.timer.timeLeft);
  const audioPlaying = useSelector((state) => state.timer.audioPlaying);
  const breakLength = useSelector((state) => state.break.length);
  const sessionLength = useSelector((state) => state.session.length);

  let timerInterval;
  useEffect(() => {
    if (isRunning) {
      timerInterval = setInterval(() => {
        dispatch(tick({ breakLength, sessionLength }));
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0 && !audioPlaying) {
      const audioElement = document.getElementById("beep");
      audioElement.currentTime = 0;
      audioElement.play();
      dispatch(playAudio());
    }
  }, [timeLeft, audioPlaying]);

  const handleReset = () => {
    const audioElement = document.getElementById("beep");
    audioElement.pause();
    audioElement.currentTime = 0;
    dispatch(resetTimer());
    dispatch(resetBreak());
    dispatch(resetSession());
    clearInterval(timerInterval);
  };

  return (
    <div id="clock">
      <h1>25 + 5 Clock</h1>
      <div className="circle">
        <SessionControl />
        <Timer />
        <BreakControl />
      </div>

      <Controls handleReset={handleReset} />
    </div>
  );
}

export default Clock;
