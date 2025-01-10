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

export type ChannelType = {
  id: number;
  channelName: string;
  members: UserInfo[];
  admin: UserInfo;
  createdAt: string;
  updatedAt: string;
};

export interface ChatSlice {
  selectedChatType: string | undefined;
  selectedChatData: UserInfo | undefined;
  selectedChatMessages: MessagesType[];
  directMessagesContacts: UserInfo[];
  isUploading: boolean;
  isDownloading: boolean;
  fileUploadProgress: number;
  fileDownloadProgress: number;
  channels: ChannelType[];
  setChannels: (channels: ChannelType[]) => void;
  setIsUploading: (isUploading: boolean) => void;
  setIsDownloading: (isDownloading: boolean) => void;
  setFileUploadProgress: (fileUploadProgress: number) => void;
  setFileDownloadProgress: (fileDownloadProgress: number) => void;
  setDirectMessagesContacts: (directMessagesContacts: UserInfo[]) => void;
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: UserInfo | undefined) => void;
  setSelectedChatMessages: (selectedChatMessages: MessagesType[]) => void;
  addChannel: (channel: ChannelType) => void;
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
  directMessagesContacts: [],
  isUploading: false,
  isDownloading: false,
  fileUploadProgress: 0,
  fileDownloadProgress: 0,
  channels: [],
  setChannels: (channels: ChannelType[]) => set({ channels }),
  setIsUploading: (isUploading: boolean) => set({ isUploading }),
  setIsDownloading: (isDownloading: boolean) => set({ isDownloading }),
  setFileUploadProgress: (fileUploadProgress: number) =>
    set({ fileUploadProgress }),
  setFileDownloadProgress: (fileDownloadProgress: number) =>
    set({ fileDownloadProgress }),
  setDirectMessagesContacts: (directMessagesContacts) =>
    set({ directMessagesContacts }),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),
  addChannel: (chanel: ChannelType) => {
    const channels = get().channels;
    set({ channels: [chanel, ...channels] });
  },
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
