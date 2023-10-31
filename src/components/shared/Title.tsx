"use client";

import {
  differenceInSeconds,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { useEffect, useState } from "react";
import Icon from "../Icons/Icon";

const Title = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const targetDate = new Date(now.getFullYear(), 10, 1);
      const diffHours = differenceInHours(now, targetDate);
      const diffMinutes = differenceInMinutes(now, targetDate) % 60;
      const diffSeconds = differenceInSeconds(now, targetDate) % 60;
      const diffDays = differenceInDays(now, targetDate);
      const dayHour =
        diffDays > 0 ? `${diffDays}일` : `${Math.abs(diffHours)}시`;
      const remainingTime = `25살이 된지 ${dayHour} ${diffMinutes}분 ${diffSeconds}초 ...`;

      const titleText = targetDate
        ? `BirthDay 🍰 is Coming`
        : `Today 🚀 is BirthDay`;
      setText(remainingTime);
      setTitle(titleText);
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
