/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/lib/auth-client";
import { MessagesType } from "@/store/slices/chat-slice";
import { useAppStore } from "@/store/store";
import {
  GET_CHANNEL_MESSAGES_ROUTE,
  GET_MESSAGES,
  SERVER_HOST,
} from "@/utils/constants";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { UserInfo } from "../../../contacts-container/components/contact-dm/ContactDm";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";

const MessageContainer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    selectedChatType,
    selectedChatData,
    selectedChatMessages,
    setSelectedChatMessages,
    setFileDownloadProgress,
    setIsDownloading,
    userInfo,
  } = useAppStore();

  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_MESSAGES,
          {
            secondUserId: selectedChatData?.id,
          },
          { withCredentials: true }
        );
        if (response.status) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getChannelMessages = async () => {
      try {
        const response = await apiClient.get(
          `${GET_CHANNEL_MESSAGES_ROUTE}/${selectedChatData?.id}`,
          { withCredentials: true }
        );
        if (response.status) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (selectedChatData?.id) {
      if (selectedChatType === "contact") getMessages();
      else if (selectedChatType === "channel") getChannelMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const checkIfImage = (filePath: string) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|ico|svg|webp)$/i;
    return imageRegex.test(filePath);
  };

  const downloadFile = async (url: string) => {
    setIsDownloading(true);
    setFileDownloadProgress(0);
    const response = await apiClient.get(`${SERVER_HOST}/${url}`, {
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentCompleted = Math.round((loaded * 100) / (total as number));
        setFileDownloadProgress(percentCompleted);
      },
    });
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop() || "downloaded_file");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
    setIsDownloading(false);
    setFileDownloadProgress(0);
  };

  const renderMessages = () => {
    let lastDate: string | null = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
          {selectedChatType === "channel" && renderChannelMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessages = (message: MessagesType) => {
    const isSentByCurrentUser =
      (message.sender as UserInfo).id !== selectedChatData?.id;
    return (
      <div className={`${isSentByCurrentUser ? "text-right" : "text-left"}`}>
        {message.messageType === "text" && (
          <div
            className={`${
              (message.sender as UserInfo).id !== selectedChatData?.id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33] text-white/80 border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {message.content}
          </div>
        )}
        {message.messageType === "file" && (
          <div
            className={`${
              (message.sender as UserInfo).id !== selectedChatData?.id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33] text-white/80 border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {checkIfImage(message.fileUrl) ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowImage(true);
                  setImageURL(message.fileUrl);
                }}
              >
                <img
                  src={`${SERVER_HOST}/${message.fileUrl}`}
                  height={300}
                  width={300}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <span className="text-white/8 text-3xl bg-black/20 rounded-full p-3">
                  <MdFolderZip />
                </span>
                <span>{message.fileUrl.split("/").pop()}</span>
                <span
                  className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                  onClick={() => downloadFile(message.fileUrl)}
                >
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
          </div>
        )}
        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  const renderChannelMessages = (message: {
    id?: number;
    content: any;
    fileUrl?: string;
    messageType: any;
    sender: any;
    recipient?: number | UserInfo;
    timestamp: any;
  }) => {
    return (
      <div
        className={`mt-5 ${
          message.sender.id !== userInfo?.id ? "text-left" : "text-right"
        }`}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender.id === userInfo?.id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33] text-white/80 border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words ${
              message.sender.id !== userInfo?.id ? "ml-9" : "mr-9"
            }`}
          >
            {message.content}
          </div>
        )}
        {message.messageType === "file" && (
          <div
            className={`${
              (message.sender.id as UserInfo).id === userInfo?.id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33] text-white/80 border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {checkIfImage(message.fileUrl as string) ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowImage(true);
                  setImageURL(message.fileUrl as string);
                }}
              >
                <img
                  src={`${SERVER_HOST}/${message.fileUrl}`}
                  height={300}
                  width={300}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <span className="text-white/8 text-3xl bg-black/20 rounded-full p-3">
                  <MdFolderZip />
                </span>
                <span>{(message.fileUrl as string).split("/").pop()}</span>
                <span
                  className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                  onClick={() => downloadFile(message.fileUrl as string)}
                >
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
          </div>
        )}
        {message.sender.id !== userInfo?.id ? (
          <div className="flex items-center justify-start gap-3">
            <Avatar className="h-8 w-8 rounded-full overflow-hidden">
              {message.sender?.image && (
                <AvatarImage
                  src={`${SERVER_HOST}/${message.sender.image}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              )}
              <AvatarFallback
                className={`uppercase h-8 w-8 text-lg flex items-center justify-center rounded-full ${getColor(
                  message.sender?.color as number
                )}`}
              >
                {message.sender?.firstName
                  ? message.sender.firstName.split("").shift()
                  : message.sender?.email?.split("").shift() ?? ""}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-white/60">
              {`${message.sender.firstName} ${message.sender.lastName}`}
            </span>
            <span className="text-xs text-white/60">
              {moment(message.timestamp).format("LT")}
            </span>
          </div>
        ) : (
          <div className="text-xs text-white/60 mt-1">
            {moment(message.timestamp).format("LT")}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
      {showImage && (
        <div className="fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col">
          <div>
            <img
              src={`${SERVER_HOST}/${imageURL}`}
              className="h-[80vh] w-full bg-cover"
            />
          </div>
          <div className="flex gap-5 fixed top-0 mt-5">
            <button
              className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
              onClick={() => downloadFile(imageURL as string)}
            >
              <IoMdArrowRoundDown />
            </button>
            <button
              className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
              onClick={() => {
                setShowImage(false);
                setImageURL(null);
              }}
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
