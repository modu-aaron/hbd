"use client";

import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
  const pathName = usePathname() || "/";
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <Link href="/">
                    <h1 className="text-2xl font-medium flex gap-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10 text-sky-500"
                      >
                        <path d="M15 1.784l-.796.796a1.125 1.125 0 101.591 0L15 1.784zM12 1.784l-.796.796a1.125 1.125 0 101.591 0L12 1.784zM9 1.784l-.796.796a1.125 1.125 0 101.591 0L9 1.784zM9.75 7.547c.498-.02.998-.035 1.5-.042V6.75a.75.75 0 011.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 011.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 00-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 011.5 0v.797zM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 012.585.364 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 012.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0012 12.75zM21.75 18.131a2.604 2.604 0 00-1.915.165 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-1.915-.165v2.494c0 1.036.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494z" />
                      </svg>
                      <span>HBD</span>
                    </h1>
                  </Link>
                </div>

                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                  <Link
                    href="/"
                    prefetch
                    className={`${
                      pathName === "/"
                        ? "border-gray-500 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium"
                        : ""
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/talktalk"
                    prefetch
                    className={`${
                      pathName === "/talktalk"
                        ? "border-gray-500 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium"
                        : ""
                    }`}
                  >
                    TalkTalk
                  </Link>
                  <Link
                    href="/gallery"
                    prefetch
                    className={`${
                      pathName === "/gallery"
                        ? "border-gray-500 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium"
                        : ""
                    }`}
                  >
                    Gallery
                  </Link>
                  <ThemeButton />
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <ThemeButton />
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none 
                               dark:hover:bg-gray-800"
                >
                  {open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                href="/"
                prefetch
                className={`${
                  pathName == "/"
                    ? "bg-teal-50 border-sky-500 text-sky-500 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:bg-gray-800"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-sky-500 block pl-3 pr-4 py-2 dark:hover:bg-gray-700 border-l-4 text-base font-medium dark:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                href="/talktalk"
                prefetch
                className={`${
                  pathName == "/talktalk"
                    ? "bg-teal-50 border-sky-500 text-sky-500 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:bg-gray-800"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-sky-500 block pl-3 pr-4 py-2 dark:hover:bg-gray-700 border-l-4 text-base font-medium dark:text-white"
                }`}
              >
                TalkTalk
              </Link>
              <Link
                href="/gallery"
                prefetch
                className={`${
                  pathName == "/gallery"
                    ? "bg-teal-50 border-sky-500 text-sky-500 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:bg-gray-800"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-sky-500 block pl-3 pr-4 py-2 dark:hover:bg-gray-700 border-l-4 text-base font-medium dark:text-white"
                }`}
              >
                Gallery
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
