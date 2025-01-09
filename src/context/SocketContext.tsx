import { UserInfo } from "@/pages/chat/components/contacts-container/components/contact-dm/ContactDm";
import { MessagesType } from "@/store/slices/chat-slice";
import { useAppStore } from "@/store/store";
import { SERVER_HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

import { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useRef<ReturnType<typeof io> | null>(null);
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(SERVER_HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleReceiveMessage = (message: MessagesType) => {
        const { selectedChatData, selectedChatType, addMessage } =
          useAppStore.getState();
        if (
          selectedChatType !== undefined &&
          (selectedChatData?.id === (message.sender as UserInfo).id ||
            selectedChatData?.id === (message.recipient as UserInfo).id)
        ) {
          console.log(message);
          addMessage(message);
          console.log(addMessage);
        }
      };
      socket.current.on("receiveMessage", handleReceiveMessage);

      socket.current.on("connect_error", (err) => {
        console.error("Connection error: ", err);
      });

      return () => {
        socket.current?.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
