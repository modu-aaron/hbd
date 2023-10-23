import React from "react";

interface PaginationProps {
  onChange: (page: number) => void;
  pageSize: number;
  current: number;
  total: number;
}

const PaginationView = ({
  onChange,
  pageSize,
  current,
  total,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);
  const firstNum = Math.floor((current - 1) / 5) * 5 + 1;
  const lastNum = Math.min(firstNum + 4, totalPages);

  const handleClick = (num: number) => {
    if (onChange) {
      if (num > 0) onChange(num);
    }
  };

  const pageButtons = [];

  for (let i = firstNum; i <= lastNum; i++) {
    pageButtons.push(
      <li key={i}>
        <button
          className={`flex items-center justify-center w-6 h-6 mr-1 rounded-full dark:bg-neutral-300 bg-sky-300/30 leading-tight ${
            current === i ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      </li>
    );
  }

  return (
    <nav aria-label="navigation">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            disabled={current === 1}
            className="flex items-center justify-center px-4 h-8 cursor-pointer dark:disabled:text-gray-500 disabled:text-gray-300"
            onClick={() => handleClick(current - 1)}
          >
            이전
          </button>
        </li>
        {pageButtons}
        <li>
          <button
            disabled={current === totalPages}
            className="flex items-center justify-center px-4 h-8 cursor-pointer dark:disabled:text-gray-500 disabled:text-gray-300"
            onClick={() => {
              if (current < totalPages) handleClick(current + 1);
            }}
          >
            다음
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationView;
