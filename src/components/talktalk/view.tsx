"use client";

import Textarea from "react-textarea-autosize";
import { useChat } from "ai/react";
import Cover from "@/components/shared/Cover";
import Title from "@/components/shared/Title";
import Icon from "@/components/Icons/Icon";
import { useEffect, useRef } from "react";
import Image from "next/image";
import BeforeTalk from "./BeforeTalk";

const TalkTalkView = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/talk",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log("test");
  }, [messages]);

  const title = (
    <div className="flex gap-2 items-center">DaHye Bot {Icon.RobotIcon}</div>
  );
  return (
    <Cover>
      <Title />
      <div className="flex flex-1 w-full space-y-2">
        <div
          className={`w-full flex-1 dark:prose-invert xl:col-span-2 pb-12 relative`}
        >
          {messages.length !== 0 ? (
            <h1 className="pt-5 xl:w-2/3 w-4/5 pb-10 space-y-5 mx-auto">
              {messages.map((message) => (
                <div key={message.id} className="w-full" ref={messagesEndRef}>
                  {message.role === "user" ? (
                    <div className="flex gap-x-2">
                      <div className="h-8 w-8 rounded-full">
                        <Image
                          src={"/user.png"}
                          alt="User"
                          priority
                          width={32}
                          height={32}
                          className="rounded-full bg-gray-200"
                        />
                      </div>
                      <p className="rounded-lg p-3 w-full border-gray-500/30 text-neutral-900 dark:text-neutral-100 border-2 text-sm">
                        {message.content}
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-x-2">
                      <div className="h-8 w-8 rounded-full">
                        <Image
                          priority
                          src={"/me.png"}
                          alt="AI"
                          width={32}
                          height={32}
                          className="bg-gray-700 rounded-full"
                        />
                      </div>
                      <p className="rounded-lg p-3 w-full border-sky-500/30 text-neutral-900 dark:text-neutral-100 border-2 text-sm">
                        {message.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </h1>
          ) : (
            <BeforeTalk />
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
                className="absolute bg-sky-500/80 dark:bg-sky-500/50 p-2 rounded-lg right-0 mr-5"
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
