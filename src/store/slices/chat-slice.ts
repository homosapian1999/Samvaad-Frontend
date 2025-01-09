import { UserInfo } from "@/pages/chat/components/contacts-container/components/contact-dm/ContactDm";

export type MessagesType = {
  id: number;
  content: string;
  fileUrl: string;
  messageType: string;
  sender: UserInfo | number;
  recipient: UserInfo | number;
  timestamp: Date;
};

export interface ChatSlice {
  selectedChatType: string | undefined;
  selectedChatData: UserInfo | undefined;
  selectedChatMessages: MessagesType[];
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: UserInfo | undefined) => void;
  setSelectedChatMessages: (selectedChatMessages: MessagesType[]) => void;
  closeChat: () => void;
  addMessage: (message: MessagesType) => void;
}

export const createChatSlice = (
  set: (state: Partial<ChatSlice>) => void,
  get: () => ChatSlice
): ChatSlice => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),
  closeChat: () =>
    set({
      selectedChatType: undefined,
      selectedChatData: undefined,
      selectedChatMessages: [],
    }),
  addMessage: (message) => {
    const { selectedChatMessages, selectedChatType } = get();
    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : (message.recipient as UserInfo).id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : (message.sender as UserInfo).id,
        },
      ],
    });
  },
});
