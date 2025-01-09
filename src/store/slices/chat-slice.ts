import { UserInfo } from "@/pages/chat/components/contacts-container/components/contact-dm/ContactDm";

export interface ChatSlice {
  selectedChatType: string | undefined;
  selectedChatData: UserInfo | undefined;
  selectedChatMessages: string[];
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: UserInfo | undefined) => void;
  setSelectedChatMessages: (selectedChatMessages: string[]) => void;
  closeChat: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addMessage: (message: any) => void;
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
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;
    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient.id,
          sender:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient.id,
        },
      ],
    });
  },
});
