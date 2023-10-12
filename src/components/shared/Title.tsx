import React from "react";

const Title = ({ title }: { title: React.ReactNode }) => {
  return (
    <div className="flex space-y-2 pt-5 pb-8 md:space-x-5">
      <h1
        className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl
  sm:leading-10 md:text-4xl md:leading-13"
      >
        {title}
      </h1>
    </div>
  );
};

export default Title;
