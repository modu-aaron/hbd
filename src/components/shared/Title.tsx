"use client";

import { differenceInSeconds, differenceInDays } from "date-fns";
import { useEffect, useState } from "react";

const Title = ({ title }: { title: React.ReactNode }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const targetDate = new Date(now.getFullYear(), 10, 1);
      const remainingSecondsTotal = differenceInSeconds(targetDate, now);
      const remainingDays = differenceInDays(targetDate, now);

      const remainingHours = Math.floor(remainingSecondsTotal / 3600);
      const remainingMinutes = Math.floor((remainingSecondsTotal % 3600) / 60);
      const remainingSeconds = remainingSecondsTotal % 60;
      const remainingTime =
        remainingDays > 0 ? `${remainingDays}일` : `${remainingHours}시`;

      setText(
        `25살까지 ${remainingTime} ${remainingMinutes}분 ${remainingSeconds}초 ...`
      );
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="flex flex-col space-y-2 py-5">
      <h1
        className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl
  sm:leading-10 md:text-4xl md:leading-13"
      >
        {title}
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
