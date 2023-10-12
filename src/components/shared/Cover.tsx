import React from "react";

const Cover = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700 flex flex-1 flex-col">
      {children}
    </div>
  );
};

export default Cover;
