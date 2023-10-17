"use client";

import Textarea from "react-textarea-autosize";
import { useChat } from "ai/react";
import Cover from "@/components/shared/Cover";
import Title from "@/components/shared/Title";
import Icon from "@/components/Icons/Icon";
import { useEffect, useRef } from "react";

const TalkTalkView = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/talk",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <Cover>
      <Title title="DaHye Bot 🤖" />
      <div className="flex flex-1 w-full space-y-2">
        <div
          className={`w-full flex-1 dark:prose-invert xl:col-span-2 pb-6 relative`}
        >
          {messages.length !== 0 ? (
            <h1 className="pt-5 xl:w-2/3 w-4/5 pb-10 space-y-5 mx-auto">
              {messages.map((message) => (
                <div key={message.id} className="w-full" ref={messagesEndRef}>
                  {message.role === "user" ? (
                    <div className="flex items-center gap-x-2">
                      <div className="bg-gray-500 h-8 w-8 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-8 w-8 text-white"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="rounded-lg p-3 w-full border-gray-500 border-2 text-sm">
                        {message.content}
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-x-2">
                      <div className="bg-sky-500 h-8 w-8 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-8 w-8 text-white"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="rounded-lg p-3 w-full border-gray-500 border-2 text-sm">
                        {message.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </h1>
          ) : (
            <div className="w-full flex flex-col items-center gap-2 justify-center pt-8">
              <h1 className="font-bold text-2xl text-gray-900 dark:text-white">
                모든 궁금증을 풀어보세요 🌟
              </h1>
              <span>생일이라 바쁜 다롱이를 대신해 알려줄게요 😉</span>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="py-2 xl:w-1/2 w-4/5 fixed bottom-0 left-1/2 -translate-x-1/2"
          >
            <div className="relative flex items-center">
              <Textarea
                tabIndex={0}
                required
                rows={1}
                value={input}
                onChange={handleInputChange}
                placeholder="질문하기..."
                spellCheck={false}
                className="w-full focus:outline-none border-neutral-300 dark:border-neutral-700 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-base p-4 pr-16"
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
      </div>
    </Cover>
  );
};

export default TalkTalkView;
