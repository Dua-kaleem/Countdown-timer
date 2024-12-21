"use client"

import { useState ,useRef ,ChangeEvent, useEffect } from "react"
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import React from 'react'

const Countdown = () => {
  const [ duration , setduration]= useState< number | string>("");
  const [ timeleft , seTtimeleft ] = useState <number>(0);
  const [isactive , setactive] = useState <boolean>(false);
  const [isPaused , setPaused] = useState <boolean>(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const handlesetduration = () :void => {
    if(typeof duration === "number"  && duration > 0){
        seTtimeleft(duration);
       setactive(false);
       setPaused(false);
       if(timeRef.current){
        clearInterval(timeRef.current);
       }
    }
  }
  const handleStart =() : void =>{
    if(timeleft > 0){
        setactive(true);
        setPaused(false);
    }
  }
  const handlePaused =() : void =>{
    if(isactive ){
        setPaused(true);
        setactive(false);
       if(timeRef.current){
        clearInterval(timeRef.current)
       }
    }
  };
  const handleReset = ():void =>{
    setactive(false);
    setPaused(false);
    seTtimeleft(typeof duration === "number"? duration : 0)
    if(timeRef.current){
        clearInterval(timeRef.current)
    }
  };

  useEffect(()=>{
    if(isactive && !isPaused){
        timeRef.current = setInterval(() => {
           seTtimeleft((prevTime) => {
          if(prevTime <= 1){
            clearInterval(timeRef.current!);
            return 0;
          }
          return prevTime -1;
           }) 
        },1000); 
    }
    return () =>{
      if(timeRef.current){
        clearInterval(timeRef.current)
      }
    };
  }, [isactive , isPaused]);

  const formatTime =(time : number) =>{
    const minutes = Math.floor(time/60) 
    const seconds = time % 60;
    return `${String(minutes).padStart(2 , "0")} : ${String(seconds).padStart(2 , "0")}`
  };
  const handleDurationChange = (e :ChangeEvent<HTMLInputElement> ) :void =>{
    setduration(Number(e.target.value) || "")
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600 via-pink-600 to-blue-600  dark:bg-gray-9000">
      {/* Timer box container */}
      <div className=" bg-pink-400 dark:bg-gray-800 shadow-xl rounded-xl  p-8 w-full max-w-md">
        {/* Title of the countdown timer */}
        <h1 className="text-4xl font-bold font-serif  mb-4 text-gray-800 dark:text-gray-200 text-center">
          Countdown Timer
        </h1>
        {/* Input and set button container */}
        <div className="flex items-center mb-6">
          <Input
            type="number"
            id="duration"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mr-4 rounded-xl border-gray-300  dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200  hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black font-bold"
          ></Input>
          
          <Button
            onClick={handlesetduration}
            variant="outline"
            className="text-gray-800 dark:text-gray-200   hover:bg-black hover:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          
          >
            Set
          </Button>
        </div>
        {/* Display the formatted time left */}
        <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {formatTime(timeleft)}
        </div>
        {/* Buttons to start, pause, and reset the timer */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-gray-800 dark:text-gray-200 hover:bg-black hover:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePaused}
            variant="outline"
            className="text-gray-800 dark:text-gray-200  hover:bg-black hover:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-gray-800 dark:text-gray-200    hover:bg-black hover:text-white
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
           
             "
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );

}

export default Countdown