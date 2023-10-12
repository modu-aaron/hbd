"use client";
import { useRef, useState } from "react";
import Modal from "../shared/Modal";
import Form from "./Form";
import { useRouter } from "next/navigation";

export interface Data {
  data: GuestBook[];
}

interface GuestBook {
  id: string;
  message: string;
  username: string;
  password: string;
  created_at: Date;
}

const GuestBook = ({ data }: Data) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isTest, setIsTest] = useState(0);
  const [pw, setPw] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const confirmPwRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onClickDeleteIcon = (entry: GuestBook) => {
    setIsOpen(!isOpen);
    setPw(entry.password);
    setId(entry.id);
  };

  const onClickUpdateIcon = (entry: GuestBook) => {
    setIsUpdate(true);
    setIsOpen(!isOpen);
    setPw(entry.password);
    setId(entry.id);
    setMessage(entry.message);
  };

  const onChangePwValue = () => {
    if (confirmPwRef.current) {
      setIsTest(confirmPwRef.current.value.length);
      const value = confirmPwRef.current.value;
      if (value.length === 4 && value === pw) {
        setIsMatch(true);
      } else {
        setIsMatch(false);
      }
    }
  };

  const onClickDeleteBtn = async (id: string) => {
    await fetch(`api/guestbook`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    router.refresh();
  };

  const title = (
    <p className="text-xl text-gray-900 dark:text-gray-100">
      비밀번호를 확인해주세요 🔒
    </p>
  );

  const deleteContent = (
    <>
      <input
        ref={confirmPwRef}
        type="password"
        maxLength={4}
        required
        className="w-1/2 rounded-md text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 text-center"
        onChange={onChangePwValue}
      />
      {isTest === 4 && !isMatch ? (
        <span className="text-gray-700 dark:text-gray-300 text-sm">
          비밀번호가 틀렸어요❗️
        </span>
      ) : (
        <></>
      )}
    </>
  );
  const updateContent = (
    <>
      <input placeholder={message} />
      <input
        ref={confirmPwRef}
        type="password"
        maxLength={4}
        required
        className="w-1/2 rounded-md text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 text-center"
        onChange={onChangePwValue}
      />
      {isTest === 4 && !isMatch ? (
        <span className="text-gray-700 dark:text-gray-300 text-sm">
          비밀번호가 틀렸어요❗️
        </span>
      ) : (
        <></>
      )}
    </>
  );
  const footer = (
    <button
      disabled={!isMatch}
      onClick={() => onClickDeleteBtn(id)}
      className="w-1/2 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-800 dark:border-gray-300 disabled:text-gray-400"
    >
      삭제하기
    </button>
  );
  return (
    <>
      <div className="w-full flex-1 pt-8 dark:prose-invert xl:col-span-2 pb-6">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="max-w-[600px] mx-auto text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Who Am I 😶‍🌫️?
          </h1>
        </div>
        <div className="w-full">
          <div className="max-w-[600px] mx-auto">
            <Form />
            {data.length > 0 && (
              <div className="flex flex-col space-y-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                {data.map((entry) => (
                  <div key={entry.id} className="w-full flex gap-2 text-base">
                    <p className="whitespace-nowrap">{`${entry.username}:`}</p>
                    <p className="w-full break-words">{entry.message}</p>
                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-sky-500 dark:text-white"
                        onClick={() => onClickDeleteIcon(entry)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-sky-500 dark:text-white"
                        onClick={() => onClickUpdateIcon(entry)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        title={title}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="py-4 px-4 flex flex-col gap-4"
      >
        {isUpdate ? updateContent : deleteContent}
        {footer}
      </Modal>
    </>
  );
};

export default GuestBook;
