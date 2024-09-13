"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";


interface AppNameProps {
  appName: string;
}

function AppName({ appName }: AppNameProps) {
  return (
    <div className="flex flex-row w-full items-center justify-center">
      <h1 className="font-extrabold text-base sm:text-2xl md:text-4xl lg:text-6xl tracking-widest uppercase">
        <Typewriter
          words={[appName]}
          loop={1}
          typeSpeed={70}
          delaySpeed={1000}
        />
      </h1>
    </div>
  );
}

export default AppName;
