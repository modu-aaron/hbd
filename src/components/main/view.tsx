"use client";
import { useRef, useState } from "react";

import Icon from "@/components/Icons/Icon";
import Modal from "@/components/shared/Modal";
import Form from "@/components/main/Form";
import Intro from "@/components/main/Intro";
import PaginationView from "@/components/shared/Pagination";
import { useRouter } from "next/navigation";
import { postDelete, postUpdate } from "../../../api/server/main";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";
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
  const { resolvedTheme, theme } = useTheme();

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isTest, setIsTest] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pw, setPw] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");
  const confirmPwRef = useRef<HTMLInputElement | null>(null);

  const onClickDeleteIcon = (entry: GuestBook) => {
    setIsDeleteOpen(true);
    setIsDelete(true);
    setPw(entry.password);
    setId(entry.id);
  };

  const onCloseDeleteModal = () => {
    setIsDeleteOpen(false);
    setIsDelete(false);
    setIsMatch(false);
    setIsTest(0);
    confirmPwRef.current = null;
  };

  const onCloseUpdateModal = () => {
    setIsUpdateOpen(false);
    setIsUpdate(false);
    setIsMatch(false);
    setIsTest(0);
    confirmPwRef.current = null;
  };

  const onClickUpdateIcon = (entry: GuestBook) => {
    setIsUpdate(true);
    setIsUpdateOpen(true);
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
    const deletePost = postDelete(id);
    toast
      .promise(
        deletePost,
        {
          pending: "삭제 중...",
          success: "삭제 완료!",
          error: "에러 발생!",
        },
        {
          position: toast.POSITION.TOP_CENTER,
        }
      )
      .then(() => {
        setIsDeleteOpen(false);
        setIsUpdate(false);
        setIsMatch(false);
        setIsTest(0);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onClickUpdateBtn = async (id: string, message: string) => {
    const updater = postUpdate(id, message);
    toast
      .promise(
        updater,
        {
          pending: "수정 중...",
          success: "수정 완료!",
          error: "에러 발생!",
        },
        {
          position: toast.POSITION.TOP_CENTER,
        }
      )
      .then(() => {
        setIsDeleteOpen(false);
        setIsUpdate(false);
        setIsMatch(false);
        setIsTest(0);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onChangePage = (page: number) => {
    setCurrent(page);
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
        className="w-2/3 rounded-md text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 text-center"
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
          className="text-gray-800 min-h-[150px] dark:text-gray-100 bg-white dark:bg-gray-800 rounded-md w-2/3"
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

  const currentData = data.slice((current - 1) * 5, current * 5);

  return (
    <>
      <div className="w-full flex-1 pt-8 dark:prose-invert xl:col-span-2 pb-8">
        <Intro />

        <div className="max-w-[600px] mx-auto">
          <Form />
          <div className="flex flex-col gap-4 items-center">
            {data.length > 0 && (
              <>
                <div className="flex flex-col w-full min-h-[200px] space-y-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                  {currentData.map((entry) => (
                    <div key={entry.id} className="w-full flex gap-2 text-base">
                      <p className="whitespace-nowrap">{`${entry.username}:`}</p>
                      <p className="w-full break-words">{entry.message}</p>
                      <div className="flex gap-2">
                        <div
                          className="cursor-pointer"
                          onClick={() => onClickDeleteIcon(entry)}
                        >
                          <Icon.DeleteIcon />
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => onClickUpdateIcon(entry)}
                        >
                          <Icon.UpdateIcon />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <PaginationView
                  onChange={onChangePage}
                  pageSize={5}
                  current={current}
                  total={data.length}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {isDelete && (
        <Modal
          title={title}
          isOpen={isDeleteOpen}
          onClose={onCloseDeleteModal}
          className="py-4 px-4 flex flex-col gap-4"
        >
          {deleteContent}
          {deleteFooter}
        </Modal>
      )}
      {isUpdate && (
        <Modal
          title={title}
          isOpen={isUpdateOpen}
          onClose={onCloseUpdateModal}
          className="py-4 px-4 flex flex-col gap-4"
        >
          {updateContent}
          {updateFooter}
        </Modal>
      )}
      <ToastContainer
        autoClose={2000}
        theme={`${resolvedTheme === "dark" ? "dark" : "light"}`}
      />
    </>
  );
};

export default GuestBookView;
