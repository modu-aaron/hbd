"use client";

import Cover from "@/components/shared/Cover";
import Title from "@/components/shared/Title";
import { useChat } from "ai/react";
import Textarea from "react-textarea-autosize";

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
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <path
                        opacity="0.5"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        fill="#1C274C"
                      />
                      <path
                        d="M16.807 19.0112C15.4398 19.9504 13.7841 20.5 12 20.5C10.2159 20.5 8.56023 19.9503 7.193 19.0111C6.58915 18.5963 6.33109 17.8062 6.68219 17.1632C7.41001 15.8302 8.90973 15 12 15C15.0903 15 16.59 15.8303 17.3178 17.1632C17.6689 17.8062 17.4108 18.5964 16.807 19.0112Z"
                        fill="#1C274C"
                      />
                      <path
                        d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3432 6 9.00004 7.34315 9.00004 9C9.00004 10.6569 10.3432 12 12 12Z"
                        fill="#1C274C"
                      />
                    </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </Cover>
  );
};

export default TalkTalkView;
