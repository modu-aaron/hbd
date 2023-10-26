"use client";
import { useRef } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { postEntry } from "../../../api/server/main";
import { toast } from "react-toastify";

const Form = () => {
  const ref = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  return (
    <form
      action={async (postData) => {
        const create = postEntry(postData);
        toast
          .promise(
            create,
            {
              pending: "작성 중...",
              success: "작성 완료!",
              error: "에러 발생!",
            },
            {
              position: toast.POSITION.TOP_CENTER,
            }
          )
          .then(() => {
            if (ref.current) ref.current.reset();
          })
          .catch((error) => {
            console.error(error);
          });
      }}
      ref={ref}
      className="flex flex-col items-center text-sm mb-5"
      style={{ opacity: pending ? 0.7 : 1 }}
    >
      <div className="w-full flex gap-2">
        <input
          type="text"
          placeholder="닉네임"
          name="username"
          required
          disabled={pending}
          className="pl-4 py-2 mt-1 focus:ring-sky-500 block w-1/2 border-neutral-300 rounded-md
      bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
        />
        <input
          type="password"
          placeholder="비밀번호 4자리"
          name="password"
          required
          inputMode="numeric"
          maxLength={4}
          disabled={pending}
          className="pl-4 py-2 mt-1 focus:ring-sky-500 block w-1/2 border-neutral-300 rounded-md
      bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
        />
      </div>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="방명록을 남겨주세요 😁"
          name="entry"
          required
          disabled={pending}
          className="pl-4 pr-32 py-2 mt-1 focus:ring-sky-500 block w-full border-neutral-300 rounded-md
      bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
        />
        <button
          type="submit"
          disabled={pending}
          className="flex items-center justify-center absolute mt-[2px] top-1/2 -translate-y-1/2 right-2 font-medium h-7 bg-sky-500/30 dark:bg-sky-500/80 text-neutral-900 dark:text-neutral-100 rounded w-16"
        >
          글쓰기
        </button>
      </div>
    </form>
  );
};

export default Form;
