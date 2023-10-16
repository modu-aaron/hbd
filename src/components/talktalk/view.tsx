"use client";

import Textarea from "react-textarea-autosize";
import { useChat } from "ai/react";
import Cover from "@/components/shared/Cover";
import Title from "@/components/shared/Title";
import Icon from "@/components/Icons/Icon";

const TalkTalkView = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/talk",
  });
  return (
    <Cover>
      <Title title="ChatBot" />
      <div className="flex-1 h-[300px] w-full">
        {messages.length !== 0 ? (
          <h1 className="pt-5 space-y-5 w-[75%] mx-auto relative">
            {messages.map((message) => (
              <div key={message.id} className="w-full">
                {message.role === "user" ? (
                  <div className="flex gap-1 absolute left-0">
                    <Icon.UserIcon />
                    <p>{message.content}</p>
                  </div>
                ) : (
                  <div className="flex gap-1 absolute right-0 w-4/5 pt-3">
                    {message.content}
                  </div>
                )}
              </div>
            ))}
          </h1>
        ) : (
          <div className="w-full flex justify-center pt-8 flex-1">
            <h1 className="font-bold text-2xl text-gray-900 dark:text-white">
              궁금한 점에 대해서 질문해주세요 🚀
            </h1>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="py-3 fixed bottom-0 left-1/2 -translate-x-1/2"
        >
          <div className="relative flex items-center">
            <Textarea
              tabIndex={0}
              required
              rows={1}
              value={input}
              onChange={handleInputChange}
              autoFocus
              placeholder="질문하기..."
              spellCheck={false}
              className="w-full focus:outline-none bg-neutral-600 placeholder:text-gray-200 text-sm text-white p-5 pr-16 rounded-xl"
            />
            <button
              type="submit"
              className="absolute bg-sky-500 p-2 rounded-lg right-0 mr-5"
            >
              <Icon.SubmitIcon />
            </button>
          </div>
        </form>
      </div>
    </Cover>
  );
};

export default TalkTalkView;
