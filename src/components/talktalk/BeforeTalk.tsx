import React from "react";
import Icon from "@/components/Icons/Icon";

const BeforeTalk = () => {
  return (
    <div className="w-full flex flex-col items-center gap-2 justify-center pt-8">
      <div className="flex gap-1 items-center">
        <h1 className="font-bold text-2xl text-gray-900 dark:text-white">
          궁금한걸 질문해봐요
        </h1>
        <img
          width="36"
          height="36"
          src="https://img.icons8.com/bubbles/50/ask-question.png"
          alt="ask-question"
        />
      </div>
      <span className="flex items-center">
        생일이라 바쁜 {Icon.JakeIcon}다롱이를 대신해 알려줄게요
      </span>
    </div>
  );
};

export default BeforeTalk;
