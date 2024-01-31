"use client";

import {
  differenceInSeconds,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";
import { useEffect, useState } from "react";
import Icon from "../Icons/Icon";

const Title = () => {
  const [text, setText] = useState("");
  const title = `환영합니다 😃`;
  useEffect(() => {
    const updateTimer = () => {
      const date = new Date();
      const currentTime = format(date, "yyyy.MM.dd HH:mm:ss");

      setText(currentTime);
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="flex flex-col space-y-2 py-5">
      <h1
        className="text-2xl flex whitespace-pre items-center font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl
  sm:leading-10 md:text-4xl md:leading-13"
      >
        {title}
        {Icon.SpongeIcon}
      </h1>
      <p
        className="text-lg font-bold leading-9 tracking-tight text-gray-700 dark:text-gray-300 sm:text-lg
  sm:leading-10 md:text-xl md:leading-13"
      >
        {text}
      </p>
    </div>
  );
};

export default Title;
