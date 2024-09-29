"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

interface AppNameProps {
  appName: string;
  subHeading: string;
}

function AppName({ appName, subHeading }: AppNameProps) {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-2">
      <h1 className="font-extrabold text-base sm:text-2xl md:text-4xl lg:text-6xl tracking-widest">
        <Typewriter
          words={[appName]}
          loop={1}
          typeSpeed={70}
          delaySpeed={1000}
        />
      </h1>
      <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-thin mt-4 text-center">
        <Typewriter
          words={[subHeading]}
          loop={1}
          typeSpeed={15}
          delaySpeed={100}
        />
      </h2>
    </div>
  );
}

export default AppName;
