import { UserInfo } from "@/pages/chat/components/contacts-container/components/contact-dm/ContactDm";

export interface ChatSlice {
  selectedChatType: string | undefined;
  selectedChatData: UserInfo | undefined;
  selectedChatMessages: string[];
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: UserInfo | undefined) => void;
  setSelectedChatMessages: (selectedChatMessages: string[]) => void;
  closeChat: () => void;
}

export const createChatSlice = (
  set: (state: Partial<ChatSlice>) => void
  //   get: () => ChatSlice
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
});
