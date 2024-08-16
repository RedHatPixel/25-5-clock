// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Slice for break length
const breakSlice = createSlice({
  name: "break",
  initialState: { length: 5 },
  reducers: {
    incrementBreak: (state) => {
      if (state.length < 60) state.length = Math.min(state.length + 1, 60);
    },
    decrementBreak: (state) => {
      if (state.length > 1) state.length = Math.max(state.length - 1, 1);
    },
    resetBreak: (state) => {
      state.length = 5;
    },
  },
});

// Slice for session length
const sessionSlice = createSlice({
  name: "session",
  initialState: { length: 25 },
  reducers: {
    incrementSession: (state) => {
      if (state.length < 60) state.length = Math.min(state.length + 1, 60);
    },
    decrementSession: (state) => {
      if (state.length > 1) state.length = Math.max(state.length - 1, 1);
    },
    resetSession: (state) => {
      state.length = 25;
    },
  },
});

// Slice for timer state
const timerSlice = createSlice({
  name: "timer",
  initialState: {
    timeLeft: 1500, // in seconds (25 minutes)
    timerType: "Session", // 'Session' or 'Break'
    isRunning: false,
    audioPlaying: false,
  },
  reducers: {
    updateTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    startStopTimer: (state) => {
      state.isRunning = !state.isRunning;
    },
    resetTimer: (state) => {
      state.timeLeft = 1500;
      state.timerType = "Session";
      state.isRunning = false;
      state.audioPlaying = false;
    },
    tick: (state, action) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      } else {
        // Switch between session and break
        if (state.timerType === "Session") {
          state.timerType = "Break";
          state.timeLeft = action.payload.breakLength * 60; // break length in seconds
        } else {
          state.timerType = "Session";
          state.timeLeft = action.payload.sessionLength * 60; // session length in seconds
        }
      }
    },
    resetAudio: (state) => {
      state.audioPlaying = false;
    },
    playAudio: (state) => {
      state.audioPlaying = true;
    },
  },
});

// Configure Store
const store = configureStore({
  reducer: {
    break: breakSlice.reducer,
    session: sessionSlice.reducer,
    timer: timerSlice.reducer,
  },
});

export const { incrementBreak, decrementBreak, resetBreak } =
  breakSlice.actions;

export const { incrementSession, decrementSession, resetSession } =
  sessionSlice.actions;

export const {
  updateTimeLeft,
  startStopTimer,
  resetTimer,
  tick,
  playAudio,
  resetAudio,
} = timerSlice.actions;

export default store;
