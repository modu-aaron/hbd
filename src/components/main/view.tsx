"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Icon from "@/components/Icons/Icon";
import Modal from "@/components/shared/Modal";
import Form from "@/components/main/Form";
import Intro from "@/components/main/Intro";

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

const GuestBookView = ({ data }: Data) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isTest, setIsTest] = useState(0);
  const [pw, setPw] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");
  const confirmPwRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const onClickDeleteIcon = (entry: GuestBook) => {
    setIsOpen(!isOpen);
    setPw(entry.password);
    setId(entry.id);
  };

  const onClose = () => {
    setIsOpen(!isOpen);
    setIsUpdate(false);
    setIsMatch(false);
    setIsTest(0);
    confirmPwRef.current = null;
  };

  const onClickUpdateIcon = (entry: GuestBook) => {
    setIsUpdate(!isUpdate);
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

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateMsg(e.target.value);
  };

  const onClickDeleteBtn = async (id: string) => {
    try {
      const response = await fetch(`/api/guestbook/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsOpen(false);
      setIsUpdate(false);
      router.refresh();
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  const onClickUpdateBtn = async (id: string, message: string) => {
    try {
      const response = await fetch(`/api/guestbook/${id}`, {
        method: "PUT",
        body: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(id, message);
      setIsOpen(false);
      router.refresh();
      return await response.json();
    } catch (error) {
      console.error(error);
    }
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
      {isMatch && (
        <textarea
          className="text-gray-800"
          placeholder={message}
          value={updateMsg}
          onChange={onChangeTextArea}
        />
      )}
    </>
  );
  const deleteFooter = (
    <button
      disabled={!isMatch}
      onClick={() => onClickDeleteBtn(id)}
      className="w-1/2 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-800 dark:border-gray-300 disabled:text-gray-400"
    >
      삭제하기
    </button>
  );

  const updateFooter = (
    <button
      disabled={!isMatch}
      onClick={() => onClickUpdateBtn(id, updateMsg)}
      className="w-1/2 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-800 dark:border-gray-300 disabled:text-gray-400"
    >
      수정하기
    </button>
  );

  return (
    <>
      <div className="w-full flex-1 pt-8 dark:prose-invert xl:col-span-2 pb-6">
        <Intro />

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
                      <div onClick={() => onClickDeleteIcon(entry)}>
                        <Icon.DeleteIcon />
                      </div>
                      <div onClick={() => onClickUpdateIcon(entry)}>
                        <Icon.UpdateIcon />
                      </div>
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
        onClose={onClose}
        className="py-4 px-4 flex flex-col gap-4"
      >
        {isUpdate ? updateContent : deleteContent}
        {isUpdate ? updateFooter : deleteFooter}
      </Modal>
    </>
  );
};

export default GuestBookView;
