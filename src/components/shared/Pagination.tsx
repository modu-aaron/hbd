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

  const handleClick = (num: number) => {
    if (onChange) {
      if (num > 0) onChange(num);
    }
  };

  // 페이지 버튼을 동적으로 생성
  const pageButtons = [];

  for (let i = 1; i <= totalPages; i++) {
    // 첫 5개 페이지는 그대로 출력
    if (i <= 4) {
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
    // 마지막 페이지는 출력
    else if (i === totalPages) {
      pageButtons.push(
        <li key={i}>
          <button
            className={`flex items-center gap-3 justify-center px-2 h-6 rounded-full dark:bg-neutral-300 bg-sky-300/30 leading-tight ${
              current === i ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => handleClick(i)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={`${
                current < totalPages && current > 4
                  ? "rgb(37 99 235)"
                  : "rgb(107 114 128)"
              }`}
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {totalPages}
          </button>
        </li>
      );
    }
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
