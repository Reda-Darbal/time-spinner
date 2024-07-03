"use client";

import React, { useState, useEffect, useRef } from "react";

const TimerSpinner = () => {
  const [inputTime, setInputTime] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [displayTime, setDisplayTime] = useState<string>("0:00");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start timer if running and time is greater than 0
    if (isRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      clearInterval(timerRef.current!);
    }
    return () => clearInterval(timerRef.current!);
  }, [isRunning, time]);

  useEffect(() => {
    // Update display time in minutes and seconds
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    setDisplayTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
  }, [time]);

  const handleStart = () => {
    const parsedTime = parseInt(inputTime, 10);
    if (!isNaN(parsedTime) && parsedTime > 0) {
      setTime(parsedTime);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setInputTime("");
    clearInterval(timerRef.current!);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && Number(value) >= 0) {
      setInputTime(value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <h1 className="text-3xl font-semibold pb-10">Timer Spinner</h1>
      <div className="relative w-40 h-40 mb-8">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 200 200"
        >
          <circle
            className="text-gray-300"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="90"
            cx="100"
            cy="100"
          />
          <circle
            className="text-blue-500"
            strokeWidth="10"
            strokeDasharray="565.48"
            strokeDashoffset={
              isRunning
                ? 565.48 - (565.48 * time) / parseInt(inputTime || "0", 10)
                : 565.48
            }
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="90"
            cx="100"
            cy="100"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-semibold text-gray-700">
            {displayTime}
          </span>
        </div>
      </div>
      <div className="mt-8 w-full max-w-xs">
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Enter time in seconds"
          value={inputTime}
          onChange={handleChange}
          disabled={isRunning}
          min="0"
        />
        <div className="flex space-x-4">
          <button
            className={`w-full py-2 rounded-md ${
              isRunning || !inputTime
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold transition duration-200`}
            onClick={handleStart}
            disabled={isRunning || !inputTime}
          >
            Start
          </button>
          <button
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition duration-200"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerSpinner;
