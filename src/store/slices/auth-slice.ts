export interface UserInfo {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string | null;
  color?: number;
  token?: string;
  profileSetup?: boolean;
}

export interface AuthSlice {
  userInfo?: UserInfo | null;
  setUserInfo: (userInfo: UserInfo | null) => void;
}

export const createAuthSlice = (
  set: (partial: Partial<AuthSlice>) => void
): AuthSlice => ({
  userInfo: undefined,
  setUserInfo: (userInfo: UserInfo | null) => set({ userInfo }),
});
