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

  const { selectedChatData, selectedChatType, addMessage } = useAppStore();

  const handleReceiveMessage = (message: {
    sender: { id: number | undefined };
    recipient: { id: number | undefined };
  }) => {
    if (
      selectedChatType !== undefined &&
      (selectedChatData?.id === message.sender.id ||
        selectedChatData?.id === message.recipient.id)
    ) {
      addMessage(message);
    }
  };

  useEffect(() => {
    if (userInfo) {
      socket.current = io(SERVER_HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

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
