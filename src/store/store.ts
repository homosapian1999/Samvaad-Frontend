import { create } from "zustand";
import { createAuthSlice, AuthSlice } from "./slices/auth-slice";
import { createChatSlice, ChatSlice } from "./slices/chat-slice";

type AppState = AuthSlice & ChatSlice;

export const useAppStore = create<AppState>((set, get) => ({
  ...createAuthSlice(set),
  ...createChatSlice(set, get),
}));
