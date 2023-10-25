import React from "react";
import Icon from "@/components/Icons/Icon";

const BeforeTalk = () => {
  return (
    <div className="w-full flex flex-col items-center gap-2 justify-center pt-8">
      <h1 className="font-bold flex gap-1 items-center text-center text-2xl text-gray-900 dark:text-white">
        {Icon.JakeCloudIcon} 궁금한걸 질문해봐요
      </h1>
      <span className="flex items-center">
        생일이라 바쁜 다롱이{Icon.JakeIcon} 대신 알려줄게요
      </span>
    </div>
  );
};

export default BeforeTalk;
